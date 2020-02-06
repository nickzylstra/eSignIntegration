const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const compression = require('compression');
const fancy = require('fancy-log');
const cors = require('cors');
const xmlparser = require('express-xml-bodyparser');
const jwtSimple = require('jwt-simple');
const dsController = require('./controllers/docusign/index');


const app = express();
app.use(cors());
app.use(bodyparser.json({ extended: true }));
app.use(compression());


// TODO - add auth middleware
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// TODO - add auth middleware
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

// TODO - add auth middleware
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
    fancy(error);
    res.status(500).send('server error submitting form');
  }
});

// TODO - add auth middleware
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

app.post('/form-status', xmlparser(), async (req, res) => {
  fancy('Docusign envelope status update:', req.body);
  // TODO - update form record at Welkin with completed status
  res.end();
});

// TODO - setup post route to receive Welkin authentication
/*
JWT auth claim
Welkin will send a POST request to the App, which will include the patient_id (if the app is configured as a patient action), worker_id, and provider_id in the JWT payload. The JWT will be included in the request body. When the request is received by the App, it will need to decode the JWT with it's credentials, and then will redirect (HTTP response 302) to the url that serves the content which will be displayed in the iFrame.

Example request from Welkin (javascript)

// this is a simplified example because the client_id and client_secret would not be transmitted to the browser
function send_app_request(client_id, client_secret, patient_id, worker_id, provider_id)
  let claim = {
    'iss': client_id,
    'aud': audience,
    'exp': Math.floor(Date.now() / 1000),
    'welkin_patient_id': patient_id,
    'welkin_worker_id': worker_id,
    'welkin_provider_id': provider_id,
  };
  let token = jwt.encode(claim, client_secret, algorithm='HS256');
  let body = {
    'token': token
  };

  // resp should include the content based on the redirect to be shown in the iFrame
  resp = requests.post('https://www.example.com/test/app', data=body);
*/

app.post('/auth', (req, res) => {
  const tokenData = req.body.token;
  try {
    const token = jwtSimple.decode(tokenData, process.env.WEBHOOK_SECRET, true, 'HS256');
    const providerId = token.welkin_provider_id;

    // TODO - create and store session
    const session = 'TODO';

    // TODO - store session info as cookie or token in res.header
    res.redirect(302, '/');
  } catch (error) {
    fancy(error);
    res.status(403).send(`Invalid access credentials. Details: ${error.message}`);
  }
});

module.exports = app;
