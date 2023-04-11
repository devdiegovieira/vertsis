const { get } = require('../lib/basicOrm');

const getLogs = async (pgConn, user, filter = {}) => {

  let { dateStart, dateEnd, source, message, offset = 0, limit = 50 } = filter;

  let filterQuery = '';

  if (dateStart) filterQuery = filterQuery + `and date >= to_date('${dateStart}', 'yyyy-mm-dd') `;
  if (dateEnd) filterQuery = filterQuery + `and date <= to_date('${dateEnd}', 'yyyy-mm-dd') `;
  if (source) filterQuery = filterQuery + `and lower(source) like '%${source.toLowerCase()}%' `;
  if (message) filterQuery = filterQuery + `and lower(message) like '%${message.toLowerCase()}%' `;

  const ret = await pgConn.one(
    `select count(1) as total 
     from log where partner_id = $1 ${filterQuery}`,
    [user.partner_id]
  );

  return {
    total: Number(ret.total),
    list: await pgConn.query(`
      select 
         *
	      from log 
        where partner_id =$1 ${filterQuery}
      LIMIT $2
      OFFSET $3
    `, [user.partner_id, Number(limit), Number(offset)])
  };
}

const deleteList = async (pgConn, user) => {
  await pgConn.query(`
  DELETE FROM public.log; 
  `, [user]);
}

module.exports = { getLogs, deleteList }