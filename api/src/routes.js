const auth = require('./controllers/auth');
const user = require('./controllers/user');
const unity = require('./controllers/unity');
const people = require('./controllers/people');
const access = require('./controllers/access');
const config = require('./controllers/config');
const logs = require('./controllers/logs');
const cep = require('./controllers/cep');
const dashboard = require('./controllers/dashboard');
const firmware = require('./controllers/firmware');
const { privateRoute, adminRoute } = require('./lib/auth');


module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/user', privateRoute, adminRoute, user);
  app.use('/unity', privateRoute, unity);
  app.use('/logs', privateRoute, logs);
  app.use('/people', privateRoute, people);
  app.use('/config', privateRoute, config);
  app.use('/access', privateRoute, access);
  app.use('/cep', privateRoute, cep);
  app.use('/dashboard', privateRoute, dashboard);
  app.use('/firmware', privateRoute, firmware);
}