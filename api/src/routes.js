const { privateRoute } = require('./lib/auth');

const auth = require('./controllers/auth');
const block = require('./controllers/block');
const unity = require('./controllers/unity');
const accessType = require('./controllers/accessType');
const concierge = require('./controllers/concierge');
const device = require('./controllers/device');
const people = require('./controllers/people');

module.exports = (app) => {
  app.use('/', device);
  app.use('/auth', auth);
  app.use('/block', privateRoute, block);
  app.use('/unity', privateRoute, unity);
  app.use('/access-type', privateRoute, accessType);
  app.use('/concierge', privateRoute, concierge);
  app.use('/people', privateRoute, people);
}