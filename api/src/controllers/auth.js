const express = require('express');
const { login, loginGoogle } = require('../data/systemUser');
const { createAuth } = require('../lib/auth');
const { createReset, confirmReset } = require('../service/auth');
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {

    let { mail, password, google } = req.body;

    let user;

    if (!google) {
      user = await login(req.pgConn, mail, password);
    } else {
      user = await loginGoogle(req.pgConn, google.profileObj.email);
    }


    res.status(200).json({ ...user, auth: await createAuth(user) });

  } catch (error) {
    next(error)
  }
});

router.post('/requestreset', async (req, res, next) => {
  try {

    let { mail } = req.body;

    await createReset(req.pgConn, mail)

    res.status(200).json();

  } catch (error) {
    next(error)
  }
}); 

router.post('/confirmreset', async (req, res, next) => {
  try {
    const {token, password} = req.body;
    await confirmReset(req.pgConn, token, password);

    res.status(200).json();
  } catch (error) {
    next(error)
  }
})

module.exports = router