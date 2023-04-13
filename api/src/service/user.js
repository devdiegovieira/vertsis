const login = async (mongoConn, mail, password) => {
  const userColl = mongoConn.collection('user');
  const user = await userColl.findOne({
    mail, 
    password, 
    active: true
  }, {projection: { password: 0, active: 0}});

  if (!user) throw 'Usuário ou Senha inválidos';

  return user;
}

const isAdmin = async (mongoConn, mail) => {
  const userColl = mongoConn.collection('user');
  return (await userColl.findOne({
    mail,  
    active: true,
    admin: true
  })) != undefined; 
}

module.exports = { login, isAdmin}