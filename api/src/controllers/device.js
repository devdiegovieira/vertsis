const express = require('express');
const { getConcierges, upsertConcierge, deleteConcierge, getConcierge } = require('../service/concierge');

const router = express.Router();

router.get('/push', async (req, res, next) => {
  try {
    const { mongoConn, query } = req;
    res.status(200).json({
      verb: "POST",
      endpoint: "get-users",
      body: { object: "users" },
      contentType: "application/json"
    });
  } catch (error) {
    next(error)
  }
});

router.get('/et-users', async (req, res, next) => {
  try {
    res.status(200).json({
      verb: "POST",
      endpoint: "get-users",
      body: { object: "users" },
      contentType: "application/json"
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;