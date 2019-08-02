//const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`ImageBoard app listening on port ${port}!`))