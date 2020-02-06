const crypto = require('crypto');
const jwtSimple = require('jwt-simple');
const { Session } = require('../../../database/index');


const createSession = async (token) => {
  const tokenData = jwtSimple.decode(token, process.env.WELKIN_SECRET, true, 'HS256');

  // eslint-disable-next-line camelcase
  const { welkin_provider_id, welkin_patient_id, welkin_worker_id } = tokenData;
  const clientAuth = crypto.randomBytes(30).toString('hex');
  const expires = new Date(Date.now() + 600000);

  const curSession = new Session({
    token: {
      id: clientAuth,
      expires,
    },
    welkin: {
      providerId: welkin_provider_id,
      patientId: welkin_patient_id,
      workerId: welkin_worker_id,
    },
  });

  await curSession.save();
  const clientToken = { clientAuth, expires };
  return clientToken;
};

const validateSession = () => {

};

module.exports = {
  createSession,
  validateSession,
};