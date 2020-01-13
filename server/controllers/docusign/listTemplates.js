const docusign = require('docusign-esign');
const dsJwtAuth = require('./dsJwtAuth');

module.exports = async function listTemplates(orgId) {
  // TODO - refactor to use passed orgId to retrieve org specific jsJwtAuth.accessToken from local db,
  // if token has expired or doesn't exist,
  // use org specific dsConfig.js data from local db to create new token then store in db
  await dsJwtAuth.checkToken();
  const dsApi = new docusign.ApiClient();
  dsApi.addDefaultHeader('Authorization', `Bearer ${dsJwtAuth.accessToken}`);
  dsApi.setBasePath(dsJwtAuth.basePath);
  const templatesApi = new docusign.TemplatesApi(dsApi);
  // TODO - refactor to retrieve folderId for orgId
  const options = { folderIds: '0df7af7f-945d-4b38-a58d-6225f94c8b07' };
  return templatesApi.listTemplates(dsJwtAuth.accountId, options);
};
