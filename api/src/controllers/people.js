const express = require('express');
const { getPeoples, upsertPeople, deletePeople, getPeople } = require('../service/people');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { mongoConn, query } = req;
    res.status(200).json(await getPeoples(mongoConn, query));
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async ({ mongoConn, params = {} }, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await getPeople(mongoConn, id));
  } catch (error) {
    next(error)
  }
});

router.post('/', async ({ mongoConn, body, user }, res, next) => {
  try {
    res.status(200).json(await upsertPeople(mongoConn, body, user));
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async ({ mongoConn, params = {} }, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await deletePeople(mongoConn, id));
  } catch (error) {
    next(error)
  }
});

module.exports = router;