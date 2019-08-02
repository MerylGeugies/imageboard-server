const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const imageRouter = require('./image/router');

const port = process.env.PORT || 4000;
const corsMiddelware = cors();
const parserMiddelware = bodyParser.json();

const app = express();
app.use(imageRouter);
app.use(corsMiddelware);
app.use(parserMiddelware);

app.listen(port, () => console.log(`ImageBoard app listening on port ${port}!`))