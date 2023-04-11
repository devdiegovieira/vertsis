const express = require('express');
const { getAccessCounterByGroup, getCounters, getLastIntegrationDate } = require('../data/access');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const counters = await getCounters(req.pgConn, req.user);
    const lastAccess = await getLastIntegrationDate(req.pgConn, req.user);

    res.status(200).json({ ...counters, lastAccess });
  } catch (error) {
    next(error)
  }
});

router.get('/getcounterbygroup', async (req, res, next) => {
  try {
    const counterByGroup = await getAccessCounterByGroup(req.pgConn, req.user, req.query);

    res.status(200).json(counterByGroup);
  } catch (error) {
    next(error)
  }
});




module.exports = router;