//import $ from 'jquery';
//import * as firebase from 'firebase';
//import * as Handlebars from 'handlebars';
import * as data from '../data/data.js';
import { template } from '../template.js';

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
        template.get('login').then(function(html) {
            const compiledTemplate = Handlebars.compile(html);
            $('#main').html(compiledTemplate);
        });
    },

    create() {
        template.get('register').then(function(html) {
            const compiledTemplate = Handlebars.compile(html);
            $('#main').html(compiledTemplate);
        });
    },

    login() {
        const $email = $("#input-email").val();
        const $password = $("#input-password").val();
        firebase.auth().signInWithEmailAndPassword($email, $password)
            .then(user => {
                // Check if remember me is ticked
                data.setLocalStorage(user);
                toastr.success(`User ${user.email} logged in successfully!`);
                location.href = '/#!home';
            })
            .catch(error => toastr.error(error.message));
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
                location.href = '/#!home';
            })
            .catch(error => {
                toastr.error(error.message);
                location.href = '/#!create';
            });
    },

    getCurrentUser() {
        const user = firebase.auth().currentUser;
        this.toggleButtons(user);
    },

    toggleButtons(user) {
        if (user) {
            $('#login').addClass('hidden');
            $('#logout').removeClass('hidden');
        } else {
            $('#login').removeClass('hidden');
            $('#logout').addClass('hidden');
        }
    }
}

export { usersController }