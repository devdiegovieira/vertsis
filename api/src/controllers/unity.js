const express = require('express');
const { getUnityList, getUnityDetail, deleteUnity, insertRegister, updateRegister } = require('../data/unity');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try { 
    res.status(200).json(await getUnityList(req.pgConn, req.user, req.query));
  } catch (error) {
    next(error)
  }
}); 

router.get('/:unityId', async (req, res, next) => {
  try { 
    res.status(200).json(await getUnityDetail(req.pgConn, req.user, req.params.unityId));
  } catch (error) {
    next(error)
  }
});

router.delete('/:unityId', async (req, res, next) => {
  try {
    res.status(200).json(await deleteUnity(req.pgConn, req.params.unityId));
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    let ret = await insertRegister(req.pgConn, req.user, req.body);
    res.status(200).json(ret);
  } catch (error) {
    next(error)
  }
});

router.put('/', async (req, res, next) => {
  try {
    res.status(200).json(await updateRegister(req.pgConn, req.user, req.body));
  } catch (error) {
    next(error)
  }
});

module.exports = router;  