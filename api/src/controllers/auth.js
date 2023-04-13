const express = require('express');
const { createAuth, privateRoute } = require('../lib/auth');
const { login } = require('../service/user');

const router = express.Router();

router.post('/login', async ({body = {}, mongoConn}, res, next) => {
  try {
    let { mail, password } = body;
    let user = await login(mongoConn, mail, password);
    res.status(200).json({ 
      ...user, 
      auth: await createAuth(user) });
  } catch (error) {
    next(error)
  }
});

router.get('/verify', privateRoute, async (req, res, next) => {
  try {
    res.status(200).json();
  } catch (error) {
    next(error)
  }
});

module.exports = router