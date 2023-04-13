const { privateRoute } = require('./lib/auth');

const auth = require('./controllers/auth');
const block = require('./controllers/block');


module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/block', privateRoute, block);

}