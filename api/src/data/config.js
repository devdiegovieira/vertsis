const getConfigPage = async (pgConn, user, filter = {}) => {

  let { search = '', offset = 0, limit = 50 } = filter;

  search = search.toLowerCase();

  let filterQuery = search != '' ?
    ` and (
       lower(type) like '%${search}%'
      or lower(key) like '%${search}%'
    )` : '';

  const ret = await pgConn.one(
    `select count(1) as total from config where partner_id = $1 ${filterQuery}`,
    [user.partner_id]
  );

  return {
    total: Number(ret.total),
    list: await pgConn.query(`
      select 
        * 
        from 
        config
        where partner_id = $1
      ${filterQuery} 
    `, [user.partner_id, Number(limit), Number(offset)])
  };

}

const getConfigDetail = async (pgConn, user, configId) => {
  let config = await pgConn.one(`
    select 
    * 
    from 
    config
    where partner_id = $1
    and id = $2
  `, [user.partner_id, configId]);
  return config;
}

const deleteConfig = async (pgConn, user, configId) => {
  await pgConn.query(`
    delete from config where partner_id = $1 and id = $2
  `, [user.partner_id, Number(configId)]);
}

const insertConfig = async (pgConn, user, fields = {}) => {
  const {
    type, key, value
  } = fields;
  let ret = await pgConn.query(`
    INSERT INTO config(
      type, key, value, partner_id)
      VALUES ($1, $2, $3, $4)
    `, [type, key, value, user.partner_id]);

  return ret[0]
}

const updateConfig = async (pgConn, user, fields = {}) => {
  if (!fields.id) throw 'id needed!';

  const {
    type, key, value, id
  } = fields;

  let ret = await pgConn.query(`
    UPDATE config
    SET type= $1, key= $2, value= $3
    WHERE partner_id = $4 and id= $5
  `, [
    type, key, value, user.partner_id, id
  ])
}

const getConfigs = async (pgConn, type = '', key = '') => {
  let filterQuerie = '';
  
  if (type) filterQuerie = filterQuerie + `and type = '${type}'`;
  if (key) filterQuerie = filterQuerie + `and key = '${key}'`;

  return await pgConn.query(`select * from config where 1=1 ${filterQuerie}`)
}

module.exports = { getConfigPage, getConfigDetail, deleteConfig, insertConfig, updateConfig, getConfigs }
