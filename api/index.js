const express = require('express');
const cors = require('cors');
const app = express();
const { errorMid } = require('./src/lib/error');
const routes = require('./src/routes');
const fileUpload = require('express-fileupload');
const { openConnection } = require('./src/connection/mongo');

const mongoConn = openConnection();

// Injections -------------------

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  req.mongoConn = await mongoConn;
  next();
})

routes(app);
app.use(errorMid);

//-------------------------------

let port = 2530;
app.listen(port);
console.log(`Api listen: ${port}`)