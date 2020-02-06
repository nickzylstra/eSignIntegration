const crypto = require('crypto');
const jwtSimple = require('jwt-simple');
const { db } = require('../../../database/index');


const createSession = (token) => {
  const tokenData = jwtSimple.decode(token, process.env.WELKIN_SECRET, true, 'HS256');

  // eslint-disable-next-line camelcase
  const { welkin_provider_id, welkin_patient_id, welkin_worker_id } = tokenData;
  const clientToken = {
    clientAuth: crypto.randomBytes(30).toString('hex'),
    expires: new Date(Date.now() + 600000),
  };

  // TODO - store welkin info and token in db
  return clientToken;
};

const validateSession = () => {

};

module.exports = {
  createSession,
  validateSession,
};
