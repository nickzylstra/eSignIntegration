/* eslint-disable camelcase */
process.env.NODE_ENV = 'test';
process.env.MONGO_DBNAME = 'esignIntegrationTest';
const jwtSimple = require('jwt-simple');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

// eslint-disable-next-line max-len
const createWelkinAppRequestData = (client_id, client_secret, patient_id, worker_id, provider_id) => {
  const claim = {
    iss: client_id,
    // aud: audience,
    // exp: Math.floor(Date.now() / 100000),
    welkin_patient_id: patient_id,
    welkin_worker_id: worker_id,
    welkin_provider_id: provider_id,
  };
  const token = jwtSimple.encode(claim, client_secret);
  const body = {
    token,
  };
  return body;
};

async function removeAllCollections() {
  Object.keys(mongoose.connection.collections).forEach(async (collectionName) => {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  });
}

describe('Server App', () => {
  afterEach(async () => {
    await removeAllCollections();
  });

  describe('GET /', () => {
    test('It should respond with 200', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /auth', () => {
    const client_id = 'id1';
    const client_secret = 'secret1';
    process.env.WELKIN_SECRET = client_secret;
    const invalid_client_secret = 'secret2';
    const patient_id = 'patient1';
    const worker_id = 'worker1';
    const provider_id = 'provider1';

    test('serves 302 to request with valid token', async () => {
      // eslint-disable-next-line max-len
      const body = createWelkinAppRequestData(client_id, client_secret, patient_id, worker_id, provider_id);
      const res = await request(app).post('/auth').send(body);
      expect(res.statusCode).toBe(302);
      const session = mongoose.connection.collections.sessions.find({ providerId: provider_id });
      expect(session).toBeDefined();
    });

    test('serves 403 to request with invalid token', async () => {
      // eslint-disable-next-line max-len
      const body = createWelkinAppRequestData(client_id, invalid_client_secret, patient_id, worker_id, provider_id);
      const res = await request(app).post('/auth').send(body);
      expect(res.statusCode).toBe(403);
    });
  });

  describe('client startup', () => {
    const client_id = 'id1';
    const client_secret = 'secret1';
    process.env.WELKIN_SECRET = client_secret;
    const patient_id = 'patient1';
    const worker_id = 'worker1';
    const provider_id = 'provider1';

    test('respond to authenticated client API calls', async () => {
      // eslint-disable-next-line max-len
      const body = createWelkinAppRequestData(client_id, client_secret, patient_id, worker_id, provider_id);
      const res1 = await request(app).post('/auth').send(body);
      const clientAuth = res1.headers['set-cookie'][0].match(/clientAuth=(\w*);/)[1];
      expect(clientAuth).toBeDefined();

      const res2 = await request(app).get('/forms').set('Cookie', `clientAuth=${clientAuth}`);
      expect(res2.status).toBe(200);
    });
  });
});
