const express = require('express');
const { getPeopleList, insertPeople, deletePeople, getPeopleDetail, updatePeople, updateActive } = require('../data/people');
const { uploadPeopleImage, deletePeopleImages } = require('../service/people');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await getPeopleList(req.pgConn, req.user, req.query));
  } catch (error) {
    next(error)
  }
});

router.get('/:peopleId', async (req, res, next) => {
  try {
    res.status(200).json(await getPeopleDetail(req.pgConn, req.user, req.params.peopleId));
  } catch (error) {
    next(error)
  }
});

router.delete('/picture', async (req, res, next) => {
  try {
    res.status(200).json(await deletePeopleImages(req.pgConn, req.user, req.body.pictures, Number(req.body.peopleId)));
  } catch (error) {
    next(error)
  }
});

router.delete('/:peopleId', async (req, res, next) => {
  try {
    res.status(200).json(await deletePeople(req.pgConn, req.params.peopleId));
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(200).json(await insertPeople(req.pgConn, req.user, req.body));
  } catch (error) {
    next(error)
  }
});

router.put('/', async (req, res, next) => {
  try {
    res.status(200).json(await updatePeople(req.pgConn, req.user, req.body));
  } catch (error) {
    next(error)
  }
});

router.put('/:peopleId/active/:active', async (req, res, next) => {
  try {
    res.status(200).json(await updateActive(req.pgConn, req.user, Number(req.params.peopleId), req.params.active == 'true'));
  } catch (error) {
    next(error)
  }
});

router.post('/:peopleId/picture', async (req, res, next) => {
  try {
    res.status(200).json(
      await uploadPeopleImage(
        req.pgConn,
        req.files.image,
        Number(req.params.peopleId)
      )
    );
  } catch (error) {
    next(error)
  }
});

module.exports = router;