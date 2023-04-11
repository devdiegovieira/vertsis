const express = require('express');
const { consultaCEP } = require('../lib/cep');
const router = express.Router();


router.get('/:cep', async (req, res, next) => {
  try {
    res.status(200).json(await consultaCEP(req.params.cep));
  } catch (error) {
    next(error)
  }

});


module.exports = router;