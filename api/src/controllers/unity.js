const express = require('express');
const { getUnits, upsertUnity, deleteUnity, getUnity } = require('../service/unity');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { mongoConn, query } = req;
    res.status(200).json(await getUnits(mongoConn, query));
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async ({ mongoConn, params = {} }, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await getUnity(mongoConn, id));
  } catch (error) {
    next(error)
  }
});


router.post('/', async ({ mongoConn, body, user }, res, next) => {
  try {
    res.status(200).json(await upsertUnity(mongoConn, body, user));
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async ({ mongoConn, params = {} }, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await deleteUnity(mongoConn, id));
  } catch (error) {
    next(error)
  }
});

module.exports = router;