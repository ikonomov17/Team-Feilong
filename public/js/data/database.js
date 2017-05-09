import * as firebase from 'firebaseApp';
import 'firebaseAuth';
import 'firebaseDb';
import {get as getRequest } from '../utils/requester.js';
//import { symbols } from './symbols.js';
//import { companies } from './companies.js';

export let Database = (function() {
	const config = {
        apiKey: 'AIzaSyD7rugoQbslDgdKW_1bXD5tFg57soBVA3E',
        authDomain: 'feilongspa-91a86.firebaseapp.com',
        databaseURL: 'https://feilongspa-91a86.firebaseio.com',
        projectId: 'feilongspa-91a86',
        storageBucket: 'feilongspa-91a86.appspot.com',
        messagingSenderId: '1075179276760'
    };

	let app = firebase.initializeApp(config);

	const dbRef = app.database();
	const auth = app.auth();

	function addNewUser(userObj) {
        if (!userObj.uid) {
            toastr.error('No user id passed!');
            return Promise.reject('No user id passed!');
        } else {
                return dbRef.ref('users/' + userObj.uid)
                .set(userObj)
                .then(success => toastr.success(`User ${userObj.email} added/updated`))
                .catch(error => toastr.error(error.message));
        }
    }

	function addNewCompany(companyObj) {
        if (!companyObj.Symbol) {
            toastr.error('No company symbol passed!');
            return Promise.reject('No company symbol passed!');
        } else {
            return dbRef.ref('companies/' + companyObj.Symbol)
                    .set(companyObj)
                    //.then(success => toastr.success(`Company ${companyObj.Symbol} added/updated`))
                    .catch(error => toastr.error(error.message));
        }
    }

	function addNewSymbol(symbol) {
	    return dbRef.ref('symbols/' + symbol)
            .set(true)
            //.then(success => toastr.success(`Symbol ${symbol} added/updated`))
            .catch(error => toastr.error(error.message));
    }

    // Use to add favorites in bulk
	function addUserProperty(property, value) {
	const user = app.auth().currentUser;

	if (!user) {
        console.log('No user logged in, yet');
        return;
    }
	dbRef.ref('users/' + user.uid + '/' + property)
            .set(value)
            .then(success => toastr.success(`${property} set`))
            .catch(error => toastr.error(error.message));
    }

    // Use to edit property
    // Use to edit property
	function addFavorite(symbol) {
	const user = app.auth().currentUser;
	if (!user) {
        console.log('No user logged in, yet');
        return;
    }
        return dbRef.ref('users/' + user.uid + '/favorites/' + symbol)
                .set(symbol);
    }

	function removeFavorite(symbol) {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        return dbRef.ref('users/' + user.uid + '/favorites/' + symbol)
                .remove();
    }

	function removeUser(uid) {
        console.log(uid);
        return dbRef.ref('users/' + uid)
                .set(null);
    }

	function watchFavorites() {
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
                Database.removeFavorite(delFav);
            }
        });
    });
	dbRefFavs.on('child_removed', response => {
	    $(`#${response.key}`).remove();
    });

    }

	function getUser() {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        return dbRef.ref('users/' + user.uid);
    }

	function getProperty(property) {
        const user = app.auth().currentUser;
        if (!user) {
            console.log('No user logged in, yet');
            return;
        }
        return dbRef.ref('users/' + user.uid)
                .once('value')
                .then(response => response.val().property);
    }

    // NB! favorites object is in response.val(), returns array
	function getFavorites() {
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
    }

    function getCompany(symbol) {
        return dbRef.ref('companies/' + symbol)
                .once('value');
    }

	function getSymbol(symbol) {
        return dbRef.ref('symbols/' + symbol)
                .once('value');
    }

	function getAllCompanies() {
        return dbRef.ref('companies/')
                .once('value');
    }

	function getAllSymbols() {
    return dbRef.ref('symbols/')
                .once('value');
    }

	function loadCompanies() {
        //companies.forEach(company => Database.addNewCompany(company));
    }

	function loadSymbols() {
        //symbols.forEach(symbol => Database.addNewSymbol(symbol));
    }


	let db = {
        addNewUser:addNewUser,
        addNewCompany:addNewCompany,
        addNewSymbol:addNewSymbol,
        addUserProperty:addUserProperty,
        addFavorite:addFavorite,
        removeFavorite:removeFavorite,
        removeUser:removeUser,
        watchFavorites:watchFavorites,
        getUser:getUser,
        getProperty:getProperty,
        getFavorites:getFavorites,
        getCompany:getCompany,
        getSymbol:getSymbol,
        getAllCompanies:getAllCompanies,
        getAllSymbols:getAllSymbols,
        loadCompanies:loadCompanies,
        loadSymbols:loadSymbols,
        app: app
    }

    return db;
    
})();