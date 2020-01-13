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

app.get('/signers', async (req, res) => {
  const { orgId } = req.query;
  try {
    const signers = await dsController.listContacts(orgId);
    res.json(signers);
  } catch (error) {
    fancy(error);
    res.status(500).send('server error getting signers');
  }
});

module.exports = app;
