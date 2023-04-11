const express = require('express');
const { getConfigPage, getConfigDetail, deleteConfig, insertConfig, updateConfig } = require('../data/config');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await getConfigPage(req.pgConn, req.user, req.query));
  } catch (error) {
    next(error)
  }
});

router.get('/:configId', async (req, res, next) => {
  try {
    res.status(200).json(await getConfigDetail(req.pgConn, req.user, req.params.configId));
  } catch (error) {
    next(error)
  }
});

router.delete('/:configId', async (req, res, next) => {
  try {
    res.status(200).json(await deleteConfig(req.pgConn, req.user, req.params.configId));
  } catch (error) {
    next(error)
  }
});

router.put('/:configId', async (req, res, next) => {
  try {
    res.status(200).json(await updateConfig(req.pgConn, req.user, req.body));
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(200).json(await insertConfig(req.pgConn, req.user, req.body));
  } catch (error) {
    next(error)
  }
});

module.exports = router;