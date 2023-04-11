
const errorMid = (err, req, res, next) => {
  res.status(400).json(err.message ? err.message : err);
}

module.exports = {errorMid}
