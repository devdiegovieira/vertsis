const express = require('express');
const { getUsers, getUserDetail, deleteUser, insertUser, updateUser, isAdmin } = require('../data/systemUser');
const { resetPasswordLogged } = require('../service/auth');
const { uploadProfileImage } = require('../service/user');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await getUsers(req.pgConn, req.user, req.query));
  } catch (error) {
    next(error)
  }
});

router.get('/admin', async (req, res, next) => {
  try {
    const admin = await isAdmin(req.pgConn, req.user.id)
    res.status(200).json(admin);
  } catch (error) {
    next(error)
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    res.status(200).json(await getUserDetail(req.pgConn, req.params.userId));
  } catch (error) {
    next(error)
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    res.status(200).json(await deleteUser(req.pgConn, req.user, req.params.userId));
  } catch (error) {
    next(error)
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    res.status(200).json(await updateUser(req.pgConn, req.user, req.body));
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(200).json(await insertUser(req.pgConn, req.user, req.body));
  } catch (error) {
    next(error)
  }
});

router.post('/userpic/:userId', async (req, res, next) => {
  try {
    res.status(200).json(
      await uploadProfileImage(
        req.pgConn,
        req.files.image,
        Number(req.params.userId)
      )
    );
  } catch (error) {
    next(error)
  }
});

router.post('/resetpassword', async (req, res, next) => {
  try {
    const { userId, password, oldPassword } = req.body;

    res.status(200).json(
      await resetPasswordLogged(
        req.pgConn,
        req.user,
        oldPassword,
        password,
        userId
      )
    );
  } catch (error) {
    next(error)
  }
});

module.exports = router;