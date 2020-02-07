const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const compression = require('compression');
const fancy = require('fancy-log');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');
const dsController = require('./controllers/docusign/index');
const { createSession } = require('./controllers/database/index');


const app = express();
app.use(cors());
app.use(bodyparser.json({ extended: true }));
app.use(compression());

// TODO - create auth middleware

// TODO - add auth middleware
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// TODO - add auth middleware, parse providerId to pass to dsController
app.get('/forms', async (req, res) => {
  const { orgId } = req.query;
  try {
    const forms = await dsController.listTemplates(orgId);
    res.json(forms);
  } catch (error) {
    fancy(error.message);
    res.status(500).send('server error getting forms');
  }
});

// TODO - add auth middleware, parse providerId to pass to dsController
app.post('/forms', async (req, res) => {
  const {
    formId,
    signerName,
    signerEmail,
    formFieldsEntries,
  } = req.body;
  try {
    const dsRes = await dsController
      .sendEnvelope(formId, signerName, signerEmail, formFieldsEntries);
    // TODO - post form record at Welkin
    res.status(201).json(dsRes);
  } catch (error) {
    fancy(error.message);
    res.status(500).send('server error submitting form');
  }
});

// TODO - add auth middleware, parse providerId to pass to dsController
app.get('/signers', async (req, res) => {
  const { orgId } = req.query;
  try {
    const signers = await dsController.listContacts(orgId);
    res.json(signers);
  } catch (error) {
    fancy(error.message);
    res.status(500).send('server error getting signers');
  }
});

app.post('/form-status', xmlparser(), async (req, res) => {
  fancy('Docusign envelope status update:', req.body);
  // TODO - update form record at Welkin with completed status
  res.end();
});

app.post('/auth', async (req, res) => {
  try {
    const { token } = req.body;
    const { clientAuth, expires } = await createSession(token);

    res.cookie('clientAuth', clientAuth, { expires });
    res.redirect(302, '/');
  } catch (error) {
    fancy(error.message);
    res.status(403).send(`Invalid access credentials. Details: ${error.message}`);
  }
});

module.exports = app;
