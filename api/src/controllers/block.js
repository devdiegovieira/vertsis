const express = require('express');
const { getBlocks, upsertBlock, deleteBlock, getBlock } = require('../service/block');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const {mongoConn, query} = req;
    res.status(200).json(await getBlocks(mongoConn, query));
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async ({mongoConn, params = {}}, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await getBlock(mongoConn, id));
  } catch (error) {
    next(error)
  }
});


router.post('/', async ({mongoConn, body, user}, res, next) => {
  try {
    res.status(200).json(await upsertBlock(mongoConn, body, user));
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async ({mongoConn, params = {}}, res, next) => {
  try {
    const { id } = params;
    res.status(200).json(await deleteBlock(mongoConn, id));
  } catch (error) {
    next(error)
  }
});

module.exports = router;