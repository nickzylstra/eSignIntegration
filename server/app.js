const express = require('express');
const path = require('path');
const compression = require('compression');
const fancy = require('fancy-log');
const dsController = require('./controllers/docusign/index');


const app = express();
app.use(compression());


app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/forms', async (req, res) => {
  const { orgId } = req.query;
  try {
    const forms = await dsController.listTemplates(orgId);
    res.json(forms);
  } catch (error) {
    fancy(error);
    res.status(500).send('server error getting forms');
  }
});

module.exports = app;
