const { use } = require('../controllers/people');
const { get } = require('../lib/basicOrm');

const login = async (pgConn, mail, password) => {
  if (!mail || !password) throw 'E-mail e senha Obrigatórios!';

  let result = await pgConn.query('SELECT * FROM system_user WHERE mail = $1 and password = $2', [mail, password]);

  if ( !result.length ) throw 'E-mail ou senha inválidos!';
  if ( !result[0].active ) throw 'Usuário Inativo!';

  delete result[0].password;

  return result[0];
}

const loginGoogle = async (pgConn, mail) => {
  let result = await pgConn.query('SELECT * FROM system_user WHERE mail = $1', [mail]);

  if (!result.length) throw 'E-mail não cadastrado!';
  if (!result[0].active) throw 'Usuário Inativo!';

  delete result[0].password;

  return result[0];
}


const getUsers = async (pgConn, user, filters = {}) => {
  let { offset = '0', limit = '50', search = '' } = filters;

  let filterQuery = search != '' ? ` 
    and (
      trim(LOWER(name)) like '%${search.toLowerCase()}%'
      or trim(LOWER(mail)) like '%${search.toLowerCase()}%'
    )` : '';

  let total = await pgConn.one(`select count(1) as total from system_user where partner_id = $1 and id <> $2 ${filterQuery}`, [user.partner_id, user.id])

  let query = `
    select * 
    from system_user 
    where partner_id = $1 ${filterQuery}  
    and id <> $2 
    order by name    
    OFFSET $3
    LIMIT $4
  `;

  let list = await pgConn.query(query, [user.partner_id, user.id, Number(offset), Number(limit)])

  return {
    total: Number(total.total),
    list
  };
}

const getUserDetail = async (pgConn, userId) => {
  let userData = await pgConn.one(`
    select a.*, b.name created_user_name
    from system_user a 
      inner join system_user b on (b.id = a.created_user)
    where a.id = $1
  `, [userId]);
  userData.created_at = new Date(userData.created_at);
  return userData;
}

const deleteUser = async (pgConn, user, userId) => {
  await pgConn.query(`
    delete from system_user where partner_id = $1 and id = $2
  `, [user.partner_id, Number(userId)]);
}

const insertUser = async (pgConn, user, fields = {}) => {
  try {
    const {
      name, mail, password, picture, active = false, admin = false
    } = fields;

    let ret = await pgConn.query(`
      INSERT INTO public.system_user(
        partner_id, name, mail, password, picture, active, created_user, admin)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [user.partner_id, name, mail, password, picture, active, user.id, admin])

    return ret[0].id;
  } catch (error) {
    throw error.detail && error.detail.includes('already exists') ? 'Email informado já existe' : error;
  }
}

const updateUser = async (pgConn, user, fields = {}) => {
  if (!fields.id) throw 'id needed!';

  const {
    name, mail, password, picture, active = false, admin = false, id
  } = fields;

  let ret = await pgConn.query(`
    UPDATE system_user
    SET name=$1, mail=$2, password=$3, picture=$4, active=$5, admin=$6
    WHERE id=$7 and partner_id = $8
  `, [
    name, mail, password, picture, active, admin, id, user.partner_id
  ])
}

const isAdmin = async (pgConn, userId) => {
  return Number((await pgConn.one(
    'select count(1) total from system_user where id = $1 and admin = true',
    [userId]
  )).total) > 0;
}

const getUser = async (pgConn, filter = {}, onlyActive = true) => {
  let filterQuery = '';

  if (filter.id) filterQuery = filterQuery + ` and id = ${filter.id} `;
  if (filter.mail) filterQuery = filterQuery + ` and mail = '${filter.mail}' `;
  if (filter.password) filterQuery = filterQuery + ` and password = '${filter.password}' `;

  let ret = await pgConn.query(`
    select * from system_user 
    where 1=1
    ${onlyActive ? ' and active = true' : ''}
    ${filterQuery}
  `)

  return ret[0];
}

const updatePass = async (pgConn, password, userId) => {
  
  await pgConn.query(`
    update system_user set password = $1 where id = $2
  `, [password, userId])
}

const updatePic = async (pgConn, pictureUrl, userId) => {
  
  await pgConn.query(`
    update system_user set picture = $1 where id = $2
  `, [pictureUrl, userId])
}

module.exports = {
  login,
  getUsers,
  getUserDetail,
  insertUser,
  updateUser,
  deleteUser,
  loginGoogle,
  isAdmin,
  getUser,
  updatePass,
  updatePic
}