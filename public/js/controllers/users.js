//import $ from 'jquery';
import * as data from '../data/data.js';

const users = {
    get(params) {
        console.log(`${params.id} is id and ${params.action} is action`);
    },

    login() {

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

export { users }