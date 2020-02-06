const crypto = require('crypto');

const createSession = (providerId, patientId, workerId) => {
  const clientToken = {
    authToken: crypto.randomBytes(30).toString('hex'),
    expires: new Date(Date.now() + 600000),
  };

  // TODO - store arguments and token in db
  return clientToken;
};

const validateSession = () => {

};

module.exports = {
  createSession,
  validateSession,
};
