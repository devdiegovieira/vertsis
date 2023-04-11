let Correios = require('node-correios');
let correios = new Correios();

const consultaCEP = async (cep = '') => {
  return await correios.consultaCEP({ cep })
}

module.exports = { consultaCEP }