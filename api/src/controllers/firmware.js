const express = require("express");
const {
  getInfoGate,
  getPersonByGateId,
  insertTransaction,
} = require("../data/firmware");
const { createAuth } = require("../lib/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await getInfoGate(req.pgConn, req.headers));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.status(200).json(await getPersonByGateId(req.pgConn, req.params.id, req.query, req.headers));
  } catch (error) {
    next(error);
  }
});

router.post("/transaction", async (req, res, next) => {
  try {
    res.status(200).json(await insertTransaction(req.pgConn, req.body));
  } catch (error) {
    next(error);
  }
});


router.post("/unitytoken", async (req, res, next) => {
  try {
    res.status(200).json(await createAuth({},false));
  } catch (error) {
    next(error);
  }
});



module.exports = router;
