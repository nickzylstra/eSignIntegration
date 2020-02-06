const crypto = require('crypto');

const createSession = (providerId, patientId, workerId) => {
  const authToken = crypto.randomBytes(30).toString('hex');
  // TODO - store arguments and token in db
  return authToken;
};

const validateSession = () => {

};

module.exports = {
  createSession,
  validateSession,
};
