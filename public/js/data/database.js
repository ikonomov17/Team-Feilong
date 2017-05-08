//import 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD7rugoQbslDgdKW_1bXD5tFg57soBVA3E",
    authDomain: "feilongspa-91a86.firebaseapp.com",
    databaseURL: "https://feilongspa-91a86.firebaseio.com",
    projectId: "feilongspa-91a86",
    storageBucket: "feilongspa-91a86.appspot.com",
    messagingSenderId: "1075179276760"
};
firebase.initializeApp(config);

const dbRef = firebase.database();

const database = {

    // Also adds/updates users
    addNewUser(userObj) {
        if (!userObj.uid) {
            toastr.error('No user id passed!');
            return Promise.reject('No user id passed!');
        } else {
            return dbRef.ref('users/' + userObj.uid)
                .set(userObj)
                .then(success => toastr.success(`User ${userObj.email} added/updated`))
                .catch(error => toastr.error(error.message));
        }
    },

    getUser(uid) {
        return dbRef.ref('users/' + uid);
    },

    getProperty(uid, property) {
        return dbRef.ref('users/' + uid + '/' + property);
    },

    addUserProperty(uid, property, value) {
        dbRef.ref('users/' + uid + '/' + property)
            .set(value)
            .then(success => toastr.success(`${property} set`))
            .catch(error => toastr.error(error.message));
    }

    // TODO Edit favorites if needed
}

export { database };