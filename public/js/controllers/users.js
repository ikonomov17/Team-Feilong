import $ from 'jquery';
import * as data from '../data/data.js';
import { database } from '../data/database.js';
import { template } from '../template.js';
import { hashHistory } from '../hasher.js';

// var config = {
//     apiKey: "AIzaSyD7rugoQbslDgdKW_1bXD5tFg57soBVA3E",
//     authDomain: "feilongspa-91a86.firebaseapp.com",
//     databaseURL: "https://feilongspa-91a86.firebaseio.com",
//     projectId: "feilongspa-91a86",
//     storageBucket: "feilongspa-91a86.appspot.com",
//     messagingSenderId: "1075179276760"
// };
// firebase.initializeApp(config);
toastr.options = {
    "positionClass": "toast-bottom-center",
}

// Listens for changes in logged in user
// Sets sign in/out buttons appropriately
firebase.auth()
    .onAuthStateChanged(user => usersController.toggleButtons(user));

class User {
    constructor(email, displayName, uid, token) {
        this.email = email;
        this.displayName = displayName;
        this.uid = uid;
        this.token = token;
        this.favorites = {};
    }
}

const usersController = {
    get(params) {
        //console.log(`${params.id} is id and ${params.action} is action`);

        template.get('user')
            .then(template => {
                $('#contents').html(template());
                $('#get-favs').on('click', () => {
                    database.getFavorites()
                        .then(
                            response => {
                                const strRes = JSON.stringify(response.val());
                                $('#favs').html(strRes);
                            });
                });
                $('#load-companies').on('click', () => database.loadCompanies());
                $('#load-symbols').on('click', () => database.loadSymbols());
            })
            .catch(error => console.log(error.message))

    },


    authenticate() {
        template.get('login').then(template => {
            $('#popup').html(template);
            usersController.clickOutOfForm();
        });
    },

    create() {
        template.get('register').then(template => {
            $('#popup').html(template);
            usersController.clickOutOfForm();
        });
    },
    // TODO no reload on error
    login() {
        const $email = $("#input-email").val();
        const $password = $("#input-password").val();
        firebase.auth().signInWithEmailAndPassword($email, $password)
            .then(response => {
                // Check if we need local storage for users at all
                data.setLocalStorage(response);
                toastr.success(`User ${response.email} logged in successfully!`);
                usersController.closeForm();
            })
            .catch(error => {
                toastr.error(error.message);
                location.href = '/#!auth';
            });
    },

    logout() {
        firebase.auth().signOut()
            .then(() => {
                // Check if we need local storage for users at all
                localStorage.clear();
                toastr.success('Good bye!');
                location.href = '/#!home';
            })
            .catch(error => toastr.error(error.message));
    },

    register() {
        const $email = $("#input-email").val();
        const $password = $("#input-password").val();
        const $displayName = $('#input-displayname').val();

        firebase.auth().createUserWithEmailAndPassword($email, $password)
            .then(response => {
                // Check if we need local storage for users at all
                // Check if we need to save token in database
                // Check: Were to save display name? Auth or DB?
                const user = new User(response.email, $displayName, response.uid, response.Yd);

                database.addNewUser(user);
                data.setLocalStorage(user);

                toastr.success(`User ${user.email} created successfully!`);
                usersController.closeForm();
            })
            .catch(error => {
                toastr.error(error.message);
                location.href = '/#!create';
            });
    },

    toggleButtons(user) {
        if (user) {
            $('#register').addClass('hidden');
            $('#user').removeClass('hidden').html(user.email);
            $('#login').addClass('hidden');
            $('#logout').removeClass('hidden');

            toastr.success(`Hi, ${user.email}!`);
        } else {
            $('#register').removeClass('hidden');
            $('#user').addClass('hidden');
            $('#login').removeClass('hidden');
            $('#logout').addClass('hidden');
            toastr.success("Add and track your favourite currencies", "Register, it's cool");
        }
    },

    clickOutOfForm() {
        // TODO Make form close on click in top bar
        $('#popup').click(function(event) {
            const id = $(event.target).attr('id');
            const cls = $(event.target).attr('class');
            // console.log(event.target);
            // console.log(this);
            // console.log(cls);
            if (id === 'login-form' || cls === 'close') {
                usersController.closeForm();
            }
        });
    },

    closeForm() {
        $('#login-form').addClass('hidden');
        // Fix to be page where we came from
        const back = hashHistory
            .slice().reverse()
            .find(hash => hash !== '!auth' && hash !== '!create' && hash !== '!register' && hash !== '!login')
        if (!back) {
            location.href = '#';
        } else {
            location.href = '#' + back;
        }
    }
}

export { usersController }