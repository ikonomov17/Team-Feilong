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

const usersController = {
    get(params) {
        console.log(`${params.id} is id and ${params.action} is action`);
    },

    login() {
        template.get('login').then(function(html) {
            console.log(html);
            // console.log(data);
            const compiledTemplate = Handlebars.compile(html);
            console.log(compiledTemplate);
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