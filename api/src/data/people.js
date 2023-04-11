const { get } = require('../lib/basicOrm');
const { upsertContact } = require('./peopleContact');
const { upsertDocument } = require('./peopleDocument');


const setPeopleToSync = async (pgConn, peopleId) => {
  await pgConn.query('update people_x_gate set synched = false where people_id = $1', [peopleId]);
  await pgConn.query(`delete from people_x_gate_error where people_id = $1`, [peopleId])

}

const getPeopleList = async (pgConn, user, filter = {}) => {

  let { active, syncStatus = 'Todos', search = '', offset = 0, limit = 50 } = filter;

  search = search.toLowerCase();

  let filterQuery = search != '' ?
    `and (
  lower(p.name) like '%${search}%'     
  or exists (
    select 1 from people_x_unity_group pxu
    inner join unity_group ug on pxu.unity_group_id = ug.id
      where p.id = pxu.people_id
      and (
        lower(ug.name) like '%${search}%' or
        exists (select 1 from unity_group ug2 where ug2.id = ug.id_sup and lower(ug2.name) like '%${search}%') 
      )
    )
  )` : '';

//        or concat ((select lower(name) from unity_group ug2 where ug2.id = ug.id_sup), ' - ',  lower(ug.name)) like '%{search}%'


  if (filter.noPic == 'true') filterQuery = filterQuery + 'and not exists (select 1 from people_picture pp where pp.people_id = p.id)';
  if (filter.noPic == 'false') filterQuery = filterQuery + 'and exists (select 1 from people_picture pp where pp.people_id = p.id)';

  if (active && (active == 'true' || active == 'false')) filterQuery = filterQuery + ` and active = ${active}`;

  if (syncStatus == 'Sincronizado') {
    filterQuery = filterQuery + ` 
      and exists (select 1 from people_x_gate pg where pg.people_id = p.id)
      and not exists (select 1 from people_x_gate_error pge where pge.people_id = p.id)
    `        
  }

  if (syncStatus == 'Não Sincronizado') {
    filterQuery = filterQuery + ` 
      and not exists (select 1 from people_x_gate pg where pg.people_id = p.id)
      and not exists (select 1 from people_x_gate_error pge where pge.people_id = p.id)
    `        
  }

  if (syncStatus == 'Erro') {
    filterQuery = filterQuery + ` 
      and exists (select 1 from people_x_gate_error pge where pge.people_id = p.id)
    `        
  }


  const ret = await pgConn.one(
    `select count(1) as total from people p where p.partner_id = $1 ${filterQuery}`, [user.partner_id]
  );

  let retDB = await pgConn.query(`
    select 
      p.id,
      p.name,
      p.birth,
      p.created_at ,
      p.active,
      case 
        when (select count(1) from people_x_gate_error pge where pge.people_id = p.id ) > 0 then 'Erro' 
        when (select count(1) from people_x_gate pg where pg.people_id = p.id ) > 0 then 'Sincronizado'
        else 'Não sincronizado'
      end sync_status
    from people p
    where p.partner_id = $1
    ${filterQuery}
    order by p.name
    LIMIT $2
    OFFSET $3
  `, [user.partner_id, Number(limit), Number(offset)]);

  let pictures = retDB.length > 0 ? await pgConn.query(`
    select * 
    from people_picture
    where people_id in (${retDB.map(m => m.id).join(',')})
  `) : [];

  let unityGroups = retDB.length > 0 ? await pgConn.query(`
    select *, (select ug2.name from unity_group ug2 where ug2.id = ug.id_sup) nome_sup
    from people_x_unity_group pug 
      left join unity_group ug on (ug.id = pug.unity_group_id)
    where pug.people_id in (${retDB.map(m => m.id).join(',')})
  `) : [];

  return {
    total: ret.total,
    list: retDB.map(m => {
      return {
        ...m,
        pictures: pictures.filter(f => f.people_id == m.id),
        unityGroups: unityGroups.filter(f => f.people_id == m.id)
      }
    })
  }
}

const getPeopleDetail = async (pgConn, user, people_id) => {
  let peopleDetail = await pgConn.one(`
    select 
      p.*
    from people p 
    where
      p.partner_id = $1 and
      p.id = $2 
  `, [user.partner_id, people_id]);

  let peopleDocuments = await pgConn.query(`
    select *
    from people_document
    where people_id = $1  
  `, [people_id]);

  let peopleContacts = await pgConn.query(`
    select *
    from people_contact
    where people_id = $1 
  `, [people_id]);


  let peopleImages = await pgConn.query(`
    select *
    from people_picture
    where people_id = $1 
  `, [people_id]);


  return { ...peopleDetail, documents: peopleDocuments, contacts: peopleContacts, pictures: peopleImages.map(m => m.url) };
}

const deletePeople = async (pgConn, peopleId) => {

  if (peopleId != 0) {
    await pgConn.query(
      `DELETE FROM access WHERE people_id=$1 `,
      [peopleId]
    );
  }
  if (peopleId != 0) {
    await pgConn.query(
      `DELETE FROM people_contact WHERE people_id=$1`,
      [peopleId]
    );
  }
  if (peopleId != 0) {
    await pgConn.query(
      `DELETE FROM people_document WHERE people_id=$1`,
      [peopleId]
    );
  }

  if (peopleId != 0) {
    await pgConn.query(
      `DELETE FROM people_picture WHERE people_id=$1 `,
      [peopleId]
    );
  }

  if (peopleId != 0) {
    await pgConn.query(
      `DELETE FROM people_X_unity_group WHERE people_id=$1 `,
      [peopleId]
    );
  }

  if (peopleId != 0) {
    await pgConn.query(
      `DELETE FROM people WHERE id=$1`,
      [peopleId]
    );
  }

  return [peopleId];
}

const updateActive = async (pgConn, user, peopleId, active = false) => {

  let ret = await pgConn.query
    (
      `update people set active=$1 
       where id = $2
         and partner_id = $3
      `,
      [active, peopleId, user.partner_id]
    )

  await setPeopleToSync(pgConn, peopleId);

  return ret;
}

const insertPeople = async (pgConn, user, fields = {}) => {

  const { external_id, name, active = false, birth, documents = [], contacts = [] } = fields;

  let ret = await pgConn.query(`
  INSERT INTO public.people(external_id, partner_id, name,active, created_user, birth)
    VALUES ($1,$2,$3,$4,$5,now()::date)
    RETURNING * 
  `, [external_id, user.partner_id, name, active, user.created_user])

  await upsertDocument(pgConn, documents, ret[0].id, user);

  await upsertContact(pgConn, contacts, ret[0].id, user);

  await pgConn.query('insert into people_x_unity_group (people_id, unity_group_id) select $1, id from unity_group where id_sup is null', [ret[0].id]);

  return ret[0].id;
}

const updatePeople = async (pgConn, user, fields = {}) => {

  const { external_id, name, birth, id, documents = [], contacts = [], active = false } = fields;

  let ret = await pgConn.query(`
     update people set external_id=$1, partner_id=$2, name=$3, active=$4, created_user=$5, birth=$6
      where id = $7
    `, [external_id, user.partner_id, name, active, user.id, birth, id]
  );

  await upsertDocument(pgConn, documents, fields.id);

  await upsertContact(pgConn, contacts, id, user);

  await setPeopleToSync(pgConn, id);

  return ret;
}

const newPic = async (pgConn, peopleId, pictureUrls) => {
  let values = pictureUrls.map((m, i) => { return `( $1, '${m}' )${i + 1 < pictureUrls.length ? ',' : ''}` }).join('')

  await pgConn.query(`
    insert into people_picture( people_id, url )
    values ${values}
  `, [peopleId])

  await setPeopleToSync(pgConn, peopleId);
}

const deletePic = async (pgConn, peopleId, picturesUrl) => {

  let total = (await pgConn.query('select count(1) as total from people_picture where people_id = $1', [peopleId]))[0].total;

  if (total - picturesUrl.length == 0) throw 'Não é possível remover todas as fotos de um usuário';

  await pgConn.query(`
    DELETE FROM people_picture
	    WHERE people_id = $1  
		    and url in ('${picturesUrl.join(`','`)}')
  `, [peopleId])
}

module.exports =
{
  getPeopleList,
  insertPeople,
  deletePeople,
  getPeopleDetail,
  updatePeople,
  newPic,
  updateActive,
  deletePic
}
