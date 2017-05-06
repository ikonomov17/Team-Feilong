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
    "positionClass": "toast-top-center",
}

const usersController = {
    get(params) {
        console.log(`${params.id} is id and ${params.action} is action`);
    },

    authenticate() {
        console.log('Autheticating');
        const $username = $("#input-username").val();
        const $password = $("#input-password").val();
        firebase.auth().signInWithEmailAndPassword($username, $password)
            .then(user => {
                console.log(user);
                // Check if remember me is ticked
                data.setLocalStorage(user);
                toastr.success(`User ${user.email} logged in successfully!`);
                location.href = '/#!home';
            })
            .catch(function(error) {
                console.log('Error in authentication');
                console.log(error);
            });
    },

    login() {
        template.get('login').then(function(html) {
            const compiledTemplate = Handlebars.compile(html);
            $('#main').html(compiledTemplate);
        });
    },

    logout() {

    },

    register() {
        const $username = $("#input-username").val();
        const $password = $("#input-password").val();

        // data.register($username, $password)
        //     .then(result => {
        //             console.log(result);
        //             login();
        //         },
        //         error => console.log(error.responseText));
    },

    remember() {

    }
}

export { usersController }