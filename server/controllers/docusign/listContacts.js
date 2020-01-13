const docusign = require('docusign-esign');
// docusign-esign module API does not support retrieving all contacts for account, only single by id
const ContactGetResponse = require('docusign-esign/src/model/ContactGetResponse');
const dsJwtAuth = require('./dsJwtAuth');

module.exports = async function listContacts(orgId) {
  // TODO - refactor to use passed orgId to retrieve org specific jsJwtAuth.accessToken from local db,
  // if token has expired or doesn't exist,
  // use org specific dsConfig.js data from local db to create new token then store in db
  await dsJwtAuth.checkToken();
  const dsApi = new docusign.ApiClient();
  dsApi.addDefaultHeader('Authorization', `Bearer ${dsJwtAuth.accessToken}`);
  dsApi.setBasePath(dsJwtAuth.basePath);

  const pathParams = {
    accountId: dsJwtAuth.accountId,
  };
  const queryParams = {};
  const headerParams = {};
  const formParams = {};
  const postBody = null;
  const authNames = [];
  const contentTypes = [];
  const accepts = ['application/json'];
  const returnType = ContactGetResponse;

  return dsApi.callApi('/v2.1/accounts/{accountId}/contacts/', 'GET',
    pathParams, queryParams, headerParams, formParams, postBody,
    authNames, contentTypes, accepts, returnType);
};
