const docusign = require('docusign-esign');
const dsJwtAuth = require('./dsJwtAuth');

module.exports = async function listTemplates(docusignFolderId) {
  await dsJwtAuth.checkToken();
  const dsApi = new docusign.ApiClient();
  dsApi.addDefaultHeader('Authorization', `Bearer ${dsJwtAuth.accessToken}`);
  dsApi.setBasePath(dsJwtAuth.basePath);
  const templatesApi = new docusign.TemplatesApi(dsApi);

  const options = { folderIds: docusignFolderId };
  return templatesApi.listTemplates(dsJwtAuth.accountId, options);
};
