import $ from 'jquery';
import { Index } from './indexClass.js';
import * as requester from '../requester.js';

var yql = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Ffinance.yahoo.com%2Fwebservice%2Fv1%2Fsymbols%2Fallcurrencies%2Fquote%3Fformat%3Djson%27&format=json&diagnostics=true&callback='

const LOCALSTORAGE_USERNAME_KEY = "email";
const LOCALSTORAGE_USERTOKEN_KEY = "token";
const LOCALSTORAGE_DISPLAYNAME_KEY = "displayName";

export function getData() {

    return requester.get(yql)
        .then(resp => {
            const listOfObjects = JSON.parse(resp.query.results.body);
            const objectArray = listOfObjects.list.resources;
            return objectArray;
        })
        .catch(error => toastr.error(`Error getting data ${error.message}`, 'Yahoo might be down'));
}

export function getOnlyNames() {
    return getData()
        .then(allObjects => allObjects.map(obj => obj.resource.fields.name.trim()))
        .catch((error) => toastr.error(`Error gettings the names ${error.message}`));
}
// export function gegProperties(...test) {
//     console.logt(test);
// }

export function setLocalStorage(user) {
    localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, user.email);
    localStorage.setItem(LOCALSTORAGE_USERTOKEN_KEY, user.Yd);
    localStorage.setItem(LOCALSTORAGE_DISPLAYNAME_KEY, user.displayName);
}

export function getLocalStorage() {

}

export function delLocalStorage() {

}