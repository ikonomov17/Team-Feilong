//import 'firebase';
import {get as getRequest } from '../requester.js';
import { symbols } from './symbols.js';
import { companies } from './companies.js';

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

    addNewCompany(companyObj) {
        if (!companyObj.Symbol) {
            toastr.error('No company symbol passed!');
            return Promise.reject('No company symbol passed!');
        } else {
            return dbRef.ref('companies/' + companyObj.Symbol)
                .set(companyObj)
                .then(success => toastr.success(`Company ${companyObj.Symbol} added/updated`))
                .catch(error => toastr.error(error.message));
        }
    },

    addNewSymbol(symbol) {
        return dbRef.ref('symbols/' + symbol)
            .set(true)
            .then(success => toastr.success(`Symbol ${symbol} added/updated`))
            .catch(error => toastr.error(error.message));

    },

    loadCompanies() {
        companies.forEach(company => database.addNewCompany(company));
    },

    loadSymbols() {
        symbols.forEach(symbol => database.addNewSymbol(symbol));
    },

    getUser() {
        const uid = firebase.auth().currentUser.uid;
        return dbRef.ref('users/' + uid);
    },

    getProperty(property) {
        const uid = firebase.auth().currentUser.uid;
        return dbRef.ref('users/' + uid + '/' + property)
            .once(snapshot => snapshot.val());
    },

    // NB! favorites object is in response.val()
    getFavorites() {
        const uid = firebase.auth().currentUser.uid;
        return dbRef.ref('users/' + uid + '/favorites')
            .once('value');
    },

    getCompany(symbol) {
        return dbRef.ref('companies/' + symbol)
            .once('value');
    },

    getSymbol(symbol) {
        return dbRef.ref('symbols/' + symbol)
            .once('value');
    },

    getAllCompanies(symbol) {
        return dbRef.ref('companies/')
            .once('value');
    },

    getAllSymbols(symbol) {
        return dbRef.ref('symbols/')
            .once('value');
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