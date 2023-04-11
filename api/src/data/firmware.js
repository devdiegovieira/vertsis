const { get } = require('../lib/basicOrm');

const getPersonByGateId = async (pgConn, gateId, filter = {}, header = {}) => {

  let unityGroupAll = [];

  let { offset = 0, limit = 50 } = filter;

  if (limit > 500) limit = 500;

  const unityGroupsRoot = (await pgConn.query(`
    select ug.id
    from unity_group ug
      inner join unity u on (u.id = ug.unity_id)
      inner join gate_x_unity_group gug on (gug.unity_group_id = ug.id)
    where gug.gate_id = $1
      and u.token = $2

  `, [gateId, header.authorization])).map(m => { return m.id });

  if (!unityGroupsRoot.length) throw 'A catraca selecionada não possui grupo de unidade ou o token de acesso não pertence a unidade correta'
  unityGroupAll.push(...unityGroupsRoot);

  let unityGropsChild = unityGroupsRoot;

  do {
    unityGropsChild = (await pgConn.query(`select id from unity_group where id_sup in (${unityGropsChild.join(',')})`)).map(m => { return m.id });
    unityGroupAll.push(...unityGropsChild);
  } while (unityGropsChild.length > 0);

  let total = (await pgConn.query(`
    select count(1) as total 
    from people p 
    where exists (
      select 1 
      from people_x_unity_group pug 
      where p.id = pug.people_id 
        and pug.unity_group_id in (${unityGroupAll.join(',')})) 
  `));

  const peopleList = await pgConn.query(`
    select 
      p.id,
      p.external_id,
      p.partner_id,
      p.name,
      p.active,
      p.created_at,
      su.name created_user,
      p.birth
    from people p 
      left join system_user su on (su.id = p.created_user)
    where exists (
      select 1 
      from people_x_unity_group pug 
      where p.id = pug.people_id 
        and pug.unity_group_id in (${unityGroupAll.join(',')})) 
    order by p.id
    offset $1
    limit $2
  `, [Number(offset), Number(limit)]);

  const pictures = peopleList.length ? await pgConn.query(`
    select * 
    from people_picture 
    where people_id in (${peopleList.map(m => m.id).join(',')})
  `) : [];

  const documents = peopleList.length ? await pgConn.query(`
    select * 
    from people_document 
    where people_id in (${peopleList.map(m => m.id).join(',')})
  `) : [];

  

  return {
    total: total[0] ? total[0].total : 0,
    offset,
    limit,
    list: peopleList.map(m => {
      return {
        ...m,
        pictures: pictures.filter(f => f.people_id == m.id).map(pic => pic.url),
        documents: documents.filter(f => f.people_id == m.id).map(doc => {return {
          type: doc.type,
          document: doc.document
        }})
      }
    })
  }

}

const getInfoGate = async (pgConn, token) => {
  if (token.length < 0 || token == '') throw 'Informe um token Válido!';

  const authorization = token["authorization"];

  let result = await pgConn.query(`
  SELECT gate.id AS gate_id,
    gate.gate_user,
    gate.name,
    gate.direction,
    gate.gate_password,
    gate.ip_address,
    gate.created_at
  FROM unity AS unity
  INNER JOIN gate AS gate ON unity.id = gate.unity_id
  WHERE unity.token = $1
  `, [authorization]);

  if (!result.length) throw 'Não foram encontradas Catracas para esta unidade';

  return result;
};

const insertTransaction = async (pgConn, pmt) => {
  if (pmt.length < 0 || pmt == '') throw 'Dados invalidos';

  let result = await pgConn.query(`
  INSERT INTO public.transaction(
    attendance_state,
    card_name,
    card_no, 
    card_type, 
    create_time, 
    current_temperature, 
    doors, 
    error_code, 
    hat_color, 
    hat_type, 
    is_over_temperature, 
    mask_color, 
    method, 
    notes, 
    password, 
    reader_id,
    rec_no, 
    reserved_int, 
    reserved_string, 
    room_number, 
    status, 
    temperature_unit, 
    type, 
    url, 
    user_id, 
    user_type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
  RETURNING *
  `, [pmt.attendanceState, pmt.cardName, pmt.cardNo, pmt.cardType, pmt.createTime, pmt.currentTemperature, pmt.doors, pmt.errorCode, pmt.hatColor, pmt.hatType, pmt.isOverTemperature, pmt.maskColor, pmt.method, pmt.notes, pmt.password, pmt.readerID, pmt.recNo, pmt.reservedInt, pmt.reservedString, pmt.roomNumber, pmt.status, pmt.temperatureUnit, pmt.type, pmt.url, pmt.userID, pmt.userType]);

  if (!result.length) throw 'Não foi possivel realizar a operação';

  return result[0].id;
};

module.exports = {
  getInfoGate,
  getPersonByGateId,
  insertTransaction
};