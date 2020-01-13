const express = require('express');
const path = require('path');
const compression = require('compression');


const app = express();
app.use(compression());


app.use(express.static(path.resolve(__dirname, '..', 'public')));


module.exports = app;
