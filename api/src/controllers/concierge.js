const express = require('express');
const { getConcierges, upsertConcierge, deleteConcierge, getConcierge } = require('../service/concierge');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { mongoConn, query } = req;
    res.status(200).json(await getConcierges(mongoConn, query));
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async ({ mongoConn, params = {} }, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await getConcierge(mongoConn, id));
  } catch (error) {
    next(error)
  }
});


router.post('/', async ({ mongoConn, body, user }, res, next) => {
  try {
    res.status(200).json(await upsertConcierge(mongoConn, body, user));
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async ({ mongoConn, params = {} }, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await deleteConcierge(mongoConn, id));
  } catch (error) {
    next(error)
  }
});

module.exports = router;