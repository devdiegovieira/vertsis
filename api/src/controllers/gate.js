const express = require('express');
const { getGateList, deleteGate } = require('../data/gate');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await getGateList(req.pgConn, req.user, { unity_id: req.query.unityId }));
  } catch (error) {
    next(error)
  }
});

router.delete('/:unityId', async (req, res, next) => {
  try {
    res.status(200).json(await deleteGate(req.pgConn, req.params.unityId));
  } catch (error) {
    next(error)
  }
});

module.exports = router;