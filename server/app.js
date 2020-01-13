const express = require('express');
const path = require('path');
const compression = require('compression');
const fancy = require('fancy-log');


const app = express();
app.use(compression());


app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('forms', async (req, res) => {
  const { org } = req.query;
  try {
    // request org forms from docusign
    // request signers from database or Welkin
    // respond with list and signers
  } catch (error) {
    fancy(error);
    res.status(500).send('server error getting forms');
  }
});

module.exports = app;
