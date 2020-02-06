const mongoose = require('mongoose');
const fancy = require('fancy-log');


module.exports = (async () => {
  const host = process.env.MONGO_HOST || '127.0.0.1://localhost/';
  const dbName = 'esignIntegration';

  try {
    const db = await mongoose.connect(`${host}${dbName}`, { useNewUrlParser: true });
    fancy(`mongoose connection error to host: "${host}" for db: "${dbName}"`);

    // session schema / model
    //   token
    //     id
    //     expires
    //   welkin
    //     providerId
    //     patientId
    //     workedId

    // provider schema / model
    //   providerId
    //   docusign
    //     clientId
    //     impersonatedUserGuid
    //     privateKey

    return {
      db,
    };
  } catch (error) {
    fancy(`mongoose connected to host: "${host}" for db: "${dbName}"`);
    return {};
  }
})();
