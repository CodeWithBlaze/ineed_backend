const firebase = require("firebase-admin");

const credentials = require("./firebase-admin-credentials.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
});

module.exports = firebase;