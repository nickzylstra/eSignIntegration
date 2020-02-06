/* eslint-disable camelcase */
process.env.NODE_ENV = 'test';
process.env.MONGO_DBNAME = 'esignIntegrationTest';
const jwtSimple = require('jwt-simple');
const request = require('supertest');
const app = require('./app');

// eslint-disable-next-line max-len
const createWelkinAppRequestData = (client_id, client_secret, patient_id, worker_id, provider_id) => {
  const claim = {
    iss: client_id,
    // aud: audience,
    exp: Math.floor(Date.now() / 1000),
    welkin_patient_id: patient_id,
    welkin_worker_id: worker_id,
    welkin_provider_id: provider_id,
  };
  const token = jwtSimple.encode(claim, client_secret, 'HS256');
  const body = {
    token,
  };
  return body;
};


describe('Server App', () => {
  describe('GET /', () => {
    test('It should respond with 200', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /auth', () => {
    it('serves redirect to valid request', async () => {

    });
  });
});
