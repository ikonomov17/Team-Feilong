//import $ from 'jquery';
//import * as firebase from 'firebase';
import * as data from '../data/data.js';
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

const usersController = {
    get(params) {
        console.log(`${params.id} is id and ${params.action} is action`);
    },


    authenticate() {
        template.get('login').then(templ => {
            $('#popup').html(templ);
            usersController.clickOutOfForm();
        });
    },

    create() {
        template.get('register').then(templ => {
            $('#popup').html(templ);
            usersController.clickOutOfForm();
        });
    },
    // TODO no reload on error
    login() {
        const $email = $("#input-email").val();
        const $password = $("#input-password").val();
        firebase.auth().signInWithEmailAndPassword($email, $password)
            .then(user => {
                // Check if remember me is ticked
                data.setLocalStorage(user);
                toastr.success(`User ${user.email} logged in successfully!`);
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
                toastr.success('Good bye!');
                location.href = '/#!home';
            })
            .catch(error => toastr.error(error.message));
    },

    register() {
        const $email = $("#input-email").val();
        const $password = $("#input-password").val();
        firebase.auth().createUserWithEmailAndPassword($email, $password)
            .then(user => {
                // Check if remember me is ticked
                data.setLocalStorage(user);
                toastr.success(`User ${user.email} created successfully!`);
                usersController.closeForm();
            })
            .catch(error => {
                toastr.error(error.message);
                location.href = '/#!create';
            });
    },

    getCurrentUser() {
        const user = firebase.auth().currentUser;
        usersController.toggleButtons(user);
    },

    toggleButtons(user) {
        if (user) {
            $('#register').addClass('hidden');
            $('#login').addClass('hidden');
            $('#logout').removeClass('hidden');
        } else {
            $('#register').removeClass('hidden');
            $('#login').removeClass('hidden');
            $('#logout').addClass('hidden');
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
        location.href = '#' + back;
    }
}

export { usersController }