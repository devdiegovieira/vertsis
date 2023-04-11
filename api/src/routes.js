
const { privateRoute, adminRoute } = require('./lib/auth');


module.exports = (app) => {
  app.use('/auth', auth);
  // app.use('/user', privateRoute, adminRoute, user);

}