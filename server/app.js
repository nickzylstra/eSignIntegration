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
    // TODO - dynamically get orgFolderId from db or Welkin
    // const orgFolderId = '0df7af7f-945d-4b38-a58d-6225f94c8b07';
    // const forms = await dsController.listTemplates(orgFolderId);
    const forms = await dsController.listTemplates(orgId);
    // TODO - request signers from database or Welkin
    res.json(forms);
  } catch (error) {
    fancy(error);
    res.status(500).send('server error getting forms');
  }
});

module.exports = app;
