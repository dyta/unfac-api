const admin = require("firebase-admin");

const serviceAccount = require('./115b3d7106.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://unlab-us-central.firebaseio.com"
});
const activity = admin.firestore();

module.exports = {
    admin,
    activity
}