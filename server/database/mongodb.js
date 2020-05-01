// ////////////////////////
// MODULE/LIBRARY IMPORT
// ////////////////////////

// Connection library.
const mongoose = require('mongoose');
const models = require('../models');

// ////////////////////////
// MONGODB OPTIONS
// ////////////////////////

// Debug settings run when not in production.
const debug = () => {
  // //////////////
  // Test: User Model Password Generation.

  // Test User data.
  const testUserData = {
    username: 'test',
    rawPassword: 'password',
  };

  // Test user.
  const TestUser = new models.User.UserModel({
    username: testUserData.username,
  });

  TestUser.generateSalt(testUserData.rawPassword, (err1, salt, hash) => {
    if (!err1) {
      TestUser.salt = salt;
      TestUser.password = hash;

      // Test authentication.
      TestUser.authenticate(testUserData.username, testUserData.rawPassword, (err2, isValid) => {
        if (!err2) {
          if (isValid) {
            console.log('Authentication test passed.');
          }
        }
      });
    }
  });

  console.log(`TestUser: ${TestUser.username}, Password Hash: ${TestUser.password}, Salt: ${TestUser.salt}`);
};

// Configure the MongoDB with mongoose.
const configure = (app, {
  URL, options, onError, onConnect,
}) => {
  console.log('Connecting to MongoDB using mongoose.');

  // Connect to the MongoDB database.
  mongoose.connect(URL, options, onError);

  // Setup additional listeners.
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection Error:'));
  db.once('open', () => {
    // Execute the connection callback.
    onConnect();

    // If in development, add elements to the Database.
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Not running in Development mode. (NODE_ENV=${process.env.NODE_ENV}).`);
      debug(app);
    }
  });
};

// ////////////////////////
// MODULE EXPORTS
// ////////////////////////

module.exports = {
  configure,
};
