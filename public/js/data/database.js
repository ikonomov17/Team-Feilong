import * as firebase from 'firebaseApp';
import 'firebaseAuth';
import 'firebaseDb';
import {get as getRequest } from '../utils/requester.js';
//import { symbols } from './symbols.js';
//import { companies } from './companies.js';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD7rugoQbslDgdKW_1bXD5tFg57soBVA3E",
    authDomain: "feilongspa-91a86.firebaseapp.com",
    databaseURL: "https://feilongspa-91a86.firebaseio.com",
    projectId: "feilongspa-91a86",
    storageBucket: "feilongspa-91a86.appspot.com",
    messagingSenderId: "1075179276760"
};
var app = firebase.initializeApp(config);

const dbRef = app.database();
const auth = app.auth();

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
                //.then(success => toastr.success(`Company ${companyObj.Symbol} added/updated`))
                .catch(error => toastr.error(error.message));
        }
    },

    addNewSymbol(symbol) {
        return dbRef.ref('symbols/' + symbol)
            .set(true)
            //.then(success => toastr.success(`Symbol ${symbol} added/updated`))
            .catch(error => toastr.error(error.message));
    },

    // Use to add favorites in bulk
    addUserProperty(property, value) {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        dbRef.ref('users/' + user.uid + '/' + property)
            .set(value)
            .then(success => toastr.success(`${property} set`))
            .catch(error => toastr.error(error.message));
    },

    // Use to edit property
    // Use to edit property
    addFavorite(symbol) {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        return dbRef.ref('users/' + user.uid + '/favorites/' + symbol)
            .set(symbol);
    },

    removeFavorite(symbol) {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        return dbRef.ref('users/' + user.uid + '/favorites/' + symbol)
            .remove();
    },

    removeUser(uid) {
        console.log(uid);
        return dbRef.ref('users/' + uid)
            .set(null);
    },

    watchFavorites() {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        const dbRefFavs = dbRef.ref('users/' + user.uid).child('favorites');
        const $favList = $('.tickets-list-table');
        // console.log($favList);
        dbRefFavs.on('child_added', response => {
            const newFav = `<tr class="ticket-row" id="${response.key}">
                <td class="td ticket-name">${response.val()}</td>
                <td class="td ticket-price">price</td>
                <td class="td ticket-fscore">fScore
                <span class="close" >×</span>
                </td></tr>`;
            $favList.append(newFav);

            $('.ticket-row').click(event => {
                if ($(event.target).attr('class') === 'close') {
                    const delFav = $(event.target).parent().parent().attr('id');
                    database.removeFavorite(delFav);
                }
            });
        });
        dbRefFavs.on('child_removed', response => {
            $(`#${response.key}`).remove();
        });

    },



    getUser() {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        return dbRef.ref('users/' + user.uid);
    },

    getProperty(property) {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        return dbRef.ref('users/' + user.uid)
            .once('value')
            .then(response => response.val().property);
    },

    // NB! favorites object is in response.val(), returns array
    getFavorites() {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        return dbRef.ref('users/' + user.uid + '/favorites')
            .once('value')
            .then(response => {
                if (!response.val()) {
                    return [];
                }
                console.log('good return');
                return Object.keys(response.val());
            });
    },

    getCompany(symbol) {
        return dbRef.ref('companies/' + symbol)
            .once('value');
    },

    getSymbol(symbol) {
        return dbRef.ref('symbols/' + symbol)
            .once('value');
    },

    getAllCompanies() {
        return dbRef.ref('companies/')
            .once('value');
    },

    getAllSymbols() {
        return dbRef.ref('symbols/')
            .once('value');
    },

    loadCompanies() {
        //companies.forEach(company => database.addNewCompany(company));
    },

    loadSymbols() {
        //symbols.forEach(symbol => database.addNewSymbol(symbol));
    },
}

export { database, app };