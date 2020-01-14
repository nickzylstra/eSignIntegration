const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const compression = require('compression');
const fancy = require('fancy-log');
const cors = require('cors');
const dsController = require('./controllers/docusign/index');


const app = express();
app.use(cors());
app.use(bodyparser.json({ extended: true }));
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

app.post('/forms', async (req, res) => {
  const {
    formId,
    signerName,
    signerEmail,
    formFieldsEntries,
  } = req.body;
  try {
    const dsRes = await dsController.sendEnvelope(formId, signerName, signerEmail, formFieldsEntries);
    // TODO - post form record at Welkin
    res.status(201).json(dsRes);
  } catch (error) {
    fancy(error);
    res.status(500).send('server error submitting form');
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

app.post('/form-status', async (req, res) => {
  fancy(req.body);
  // TODO - update form record at Welkin with completed status
  res.end();
});

module.exports = app;
