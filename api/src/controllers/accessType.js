const express = require('express');
const { getAccessTypes, upsertAccessType, deleteAccessType, getAccessType } = require('../service/accessType');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { mongoConn, query } = req;
    res.status(200).json(await getAccessTypes(mongoConn, query));
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async ({ mongoConn, params = {} }, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await getAccessType(mongoConn, id));
  } catch (error) {
    next(error)
  }
});


router.post('/', async ({ mongoConn, body, user }, res, next) => {
  try {
    res.status(200).json(await upsertAccessType(mongoConn, body, user));
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async ({ mongoConn, params = {} }, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await deleteAccessType(mongoConn, id));
  } catch (error) {
    next(error)
  }
});

module.exports = router;