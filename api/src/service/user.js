const login = async (mongoConn, mail, password) => {
  const userColl = mongoConn.collection('user');
  return (await userColl.findOne({
    mail, 
    password, 
    active: true}
  )) != undefined;
}

module.exports = { login }