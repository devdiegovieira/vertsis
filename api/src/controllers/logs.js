const express = require('express');
const { getLogs, deleteList } = require('../data/logs');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await getLogs(req.pgConn, req.user, req.query));
  } catch (error) {
    next(error)
  }
});

router.delete('/', async (req, res, next) => {
  try{
    res.status(200).json(await deleteList( req.pgConn, req.user, req.query));
  } catch (error) {
    next(error)
  }
});

module.exports = router; 