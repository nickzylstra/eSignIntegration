// listEnvelopes.js
/**
 * @file listEnvelopes
 * This files lists the envelopes in the user's account
 * whose status has changed in the last 30 days.
 * @author DocuSign
 */


const moment = require('moment');
const docusign = require('docusign-esign');
const dsJwtAuth = require('./dsJwtAuth');

const listEnvelopes = {};
module.exports = listEnvelopes;

/**
  * Lists the envelopes in the account
  * The Envelopes::listStatusChanges method has many options
  * See https://developers.docusign.com/esign-rest-api/reference/Envelopes/Envelopes/listStatusChanges
  *
  * The list status changes call requires at least a from_date OR
  * a set of envelopeIds. Here we filter using a from_date.
  * Here we set the from_date to filter envelopes for the last month
  * Use ISO 8601 date format
  *
  * SIDE EFFECTS: The function checks the accessToken and causes a new one to be
  *               created if need be
  * @function
  * @returns {promise} Results of the list operation
  */
listEnvelopes.listEnvelopes = async function _listEnvelopes() {
  await dsJwtAuth.checkToken();
  const dsApi = new docusign.ApiClient();
  dsApi.addDefaultHeader('Authorization', `Bearer ${dsJwtAuth.accessToken}`);
  dsApi.setBasePath(dsJwtAuth.basePath);
  const envelopesApi = new docusign.EnvelopesApi(dsApi);
  const options = { fromDate: moment().subtract(30, 'days').format() };
  const results = await envelopesApi.listStatusChanges(dsJwtAuth.accountId, options);
  return results;
};
