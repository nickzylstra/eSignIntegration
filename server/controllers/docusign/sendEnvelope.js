const docusign = require('docusign-esign');
const dsJwtAuth = require('./dsJwtAuth');

module.exports = async function sendEnvelope(formId, signerName, signerEmail, formFieldsEntries) {
  // TODO - refactor to use passed orgId to retrieve org specific jsJwtAuth.accessToken from local db,
  // if token has expired or doesn't exist,
  // use org specific dsConfig.js data from local db to create new token then store in db
  await dsJwtAuth.checkToken();
  const dsApi = new docusign.ApiClient();
  dsApi.addDefaultHeader('Authorization', `Bearer ${dsJwtAuth.accessToken}`);
  dsApi.setBasePath(dsJwtAuth.basePath);

  const envelopesApi = new docusign.EnvelopesApi(dsApi);

  const tRole = new docusign.TemplateRole();
  tRole.roleName = 'signer';
  tRole.name = signerName;
  tRole.email = signerEmail;
  tRole.tabs = {
    textTabs: formFieldsEntries.map((entry) => (
      { tabLabel: entry[0], value: entry[1] })),
  };

  const templateRolesList = [];
  templateRolesList.push(tRole);

  const envelopeDefinition = {
    status: 'sent',
    templateId: formId,
    templateRoles: templateRolesList,
    eventNotification: {
      url: `${process.env.NODE_HOST}/form-status`,
      loggingEnabled: 'true',
      envelopeEvent: ['Completed'],
    },
  };

  return envelopesApi.createEnvelope(dsJwtAuth.accountId, { envelopeDefinition });
};
