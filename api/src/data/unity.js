const { get } = require('../lib/basicOrm');
const { upsertGate } = require('./gate');
const { createAuth } = require('../lib/auth');
const { upsertUnityGroupMaster,selectUnityGroupMaster } = require('./unitygroup');


const getUnityList = async (pgConn, user, filter = {}) => {

  let { active, search = '', offset = 0, limit = 50 } = filter;

  search = search.toLowerCase();

  let filterQuery = search != '' ?
    `and (
      lower(a.name) like '%${search}%' 
       or lower(a.address) like '%${search}%'  
      ${!isNaN(search) ? `or CAST(a.zip AS TEXT) like '%${search}%' ` : ''} 
      or lower(a.city) like '%${search}%'  
      or lower(a.state) like '%${search}%'  
      ${!isNaN(search) ? `or CAST(a.phone AS TEXT) like '%${search}%' ` : ''} 
    )` : '';

  if (active && (active == 'true' || active == 'false')) filterQuery = filterQuery + ` and active = ${active}`;

  const ret = await pgConn.one(
    `select count(1) as total from unity a where a.partner_id = $1 ${filterQuery}`,
    [user.partner_id]
  );

  return {
    total: Number(ret.total),
    list: await pgConn.query(`
      select 
        a.*, 
        b.name partnerName 
      from unity a 
        inner join partner b on (a.partner_id = b.id)
      where
        a.partner_id = $1
      ${filterQuery} 
      order by
        a.name
      LIMIT $2
      OFFSET $3
    `, [user.partner_id, Number(limit), Number(offset)])
  };
}

const getUnityDetail = async (pgConn, user, unityId) => {
  let unityDetail = await pgConn.one(`
    select 
      a.*
    from unity a 
    where
      a.partner_id = $1 and
      a.id = $2 
  `, [user.partner_id, unityId]);


  let gateByUnity = await pgConn.query(`
    select * from gate where unity_id = $1
  `, [unityId]);

  unityDetail.gates = gateByUnity;

  return unityDetail;
}

const deleteUnity = async (pgConn, unityId) => {
  if (unityId.gateByUnity != 0) throw 'Unidade não pode ser deletada';
  await pgConn.query(`
    delete from unity
    where id = $1
  `, [Number(unityId)])
}

const insertRegister = async (pgConn, user, fields = {}) => {
  const {
    name, address, zip, city, state, phone, complement, district, number, gates = [], integration_id
  } = fields;

  let ret = await pgConn.query(`
    INSERT INTO unity(partner_id, name, address, zip, city, state, phone, complement, district, number, created_user, token, integration_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING * 
  `, [
    user.partner_id,
    name,
    address,
    Number(zip.match(/\d+/g).join('')),
    city,
    state,
    Number(phone.match(/\d+/g).join('')),
    complement,
    district,
    number,
    user.id,
    await createAuth({},
    false,
    integration_id)
  ])

  let unityGroupMasterId = await upsertUnityGroupMaster(pgConn, ret[0].id, user);

  await upsertGate(pgConn, gates, ret[0].id, user, unityGroupMasterId);

  return ret[0].id;
}

const updateRegister = async (pgConn, user, fields = {}) => {

  const {
    name, address, zip, city, state, phone, complement, district, number, id, gates = [], active = false, integration_id
  } = fields;

  let ret = await pgConn.query(`
    update unity set 
      name = $1, 
      address = $2, 
      zip = $3, 
      city = $4, 
      state = $5, 
      phone = $6, 
      complement = $7, 
      district = $8, 
      number = $9,
      active = $11,
      integration_id = $12
    where id = $10
  `, [
    name,
    address,
    Number(zip.match(/\d+/g).join('')),
    city,
    state,
    Number(phone.match(/\d+/g).join('')),
    complement,
    district,
    number,
    id,
    active,
    integration_id
  ])

  let unityGroupMasterId = await selectUnityGroupMaster(pgConn, id);

  await upsertGate(pgConn, gates, id, user, unityGroupMasterId);


  return ret;
}

module.exports = { getUnityList, getUnityDetail, deleteUnity, insertRegister, updateRegister }