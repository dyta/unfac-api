const admin = require("firebase-admin");

const serviceAccount = require('./FIREBASE_ADMIN_HERE.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://unlab-us-central.firebaseio.com"
});
const activity = admin.firestore();

module.exports = {
    admin,
    activity
}