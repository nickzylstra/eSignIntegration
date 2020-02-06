const mongoose = require('mongoose');
const fancy = require('fancy-log');


module.exports = (async () => {
  const host = process.env.MONGO_HOST || 'mongodb://localhost/';
  const dbName = process.env.MONGO_DBNAME || 'esignIntegration';

  try {
    const db = await mongoose.connect(`${host}${dbName}`, { useNewUrlParser: true });
    fancy(`mongoose connected to host: "${host}" for db: "${dbName}"`);

    const sessionSchema = new mongoose.Schema({
      token: {
        id: String,
        expires: Date,
      },
      welkin: {
        providerId: String,
        patientId: String,
        workerId: String,
      },
    });

    const Session = mongoose.model('Session', sessionSchema);

    // provider schema / model
    //   providerId
    //   docusign
    //     clientId
    //     impersonatedUserGuid
    //     privateKey

    return {
      db,
      Session,
    };
  } catch (error) {
    fancy(`mongoose connection error to host: "${host}" for db: "${dbName}"`);
    return {};
  }
})();
