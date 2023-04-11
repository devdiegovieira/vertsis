const express = require('express');
const { getAccessList } = require('../data/access');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await getAccessList(req.pgConn, req.user, req.query));
  } catch (error) {
    next(error)
  }
});

module.exports = router; 