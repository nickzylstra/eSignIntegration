const express = require('express');
const path = require('path');
const compression = require('compression');
const fancy = require('fancy-log');
const cors = require('cors');
const bodyParser = require('body-parser');
const xmlParser = require('express-xml-bodyparser');
const cookieParser = require('cookie-parser');
const dsController = require('./controllers/docusign/index');
const { requireAuth } = require('./middleware/requireAuth');
const { createSession } = require('./controllers/auth/index');


const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// TODO - add auth middleware,
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/forms', requireAuth, async (req, res) => {
  const { providerId } = req.session;
  try {
    const forms = await dsController.listTemplates(providerId);
    res.json(forms);
  } catch (error) {
    fancy(error.message);
    res.status(500).send('server error getting forms');
  }
});

// TODO - add auth middleware, parse providerId to pass to dsController
app.post('/forms', requireAuth, async (req, res) => {
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

app.get('/signers', requireAuth, async (req, res) => {
  const { providerId } = req.session;
  try {
    const signers = await dsController.listContacts(providerId);
    res.json(signers);
  } catch (error) {
    fancy(error.message);
    res.status(500).send('server error getting signers');
  }
});

app.post('/form-status', xmlParser(), async (req, res) => {
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
