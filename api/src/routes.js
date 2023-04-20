const { privateRoute } = require('./lib/auth');

const auth = require('./controllers/auth');
const block = require('./controllers/block');
const unity = require('./controllers/unity');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/block', privateRoute, block);
  app.use('/unity', privateRoute, unity);

}