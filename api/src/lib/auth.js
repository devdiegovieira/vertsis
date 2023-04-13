const private = "ASdAhdasd@11231!@#";
const jwt = require("jsonwebtoken");
const { isAdmin } = require("../service/user");

const privateRoute = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) throw 'Header > Authorization é obrigatório!';
    req.user = await jwt.verify(token, private);
    next();
  } catch (error) {
    let errorMsg = error;
    if (typeof error == 'object')
      switch (error.name) {
        case 'TokenExpiredError':
          errorMsg = 'Token Expirado!'
          break;
        case 'JsonWebTokenError':
          errorMsg = 'Token inválido!'
          break;
        default:
          errorMsg = error.message;
          break;
      }

    res.status(401).send(errorMsg);
  }
};

const createAuth = async (payload = {}, expires = true, expiresIn = '12h') => {
  let options = {};
  if (expires) options.expiresIn = expiresIn;

  return await jwt.sign(payload, private, options);
};

const adminRoute = async (req, res, next) => {
  try {
    if (!(await isAdmin(req.mongoConn, req.user.mail))) 
      throw 'Necessário permissão de admin!';

    next();
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { privateRoute, createAuth, adminRoute }
