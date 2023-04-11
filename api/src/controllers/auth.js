const express = require('express');
const { login, loginGoogle } = require('../data/systemUser');
const { createAuth } = require('../lib/auth');
const { createReset, confirmReset } = require('../service/auth');
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    res.status(200).json({ ...user, auth: await createAuth(user) });
  } catch (error) {
    next(error)
  }
});

module.exports = router