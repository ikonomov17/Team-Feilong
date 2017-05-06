import $ from 'jquery';
import { Index } from './indexClass.js';

var yql = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Ffinance.yahoo.com%2Fwebservice%2Fv1%2Fsymbols%2Fallcurrencies%2Fquote%3Fformat%3Djson%27&format=json&diagnostics=true&callback='

const LOCALSTORAGE_USERNAME_KEY = "email";
const LOCALSTORAGE_USERTOKEN_KEY = "token";
const LOCALSTORAGE_DISPLAYNAME_KEY = "displayName";

export function getData() {
    return new Promise((resolve, reject) => {

        fetchData().done((d) => {
            const rawData = parseData(d);
            console.log('done');
            resolve(rawData);
        });
    });
}

function fetchData() {
    console.log('1.fetch');
    return $.getJSON(yql);
}

function parseData(jsonString) {
    try {
        const listOfObjects = JSON.parse(jsonString.query.results.body);
        const objects = listOfObjects.list.resources;
        console.log('2.parse data');
        const indexesList = [];

        //Convert objects to Indexes
        objects.forEach(obj => {
            const index = new Index(obj.resource.fields.name, obj.resource.fields.price, obj.resource.fields.symbol, obj.resource.fields.volume)
            indexesList.push(index);
        });
        return indexesList;
    } catch (err) {
        //to Implement notificatins?

        console.log('Yahoo does not work AGAIN');
    }
}

export function getOnlyNames() {
    return new Promise((resolve) => {
        const namesArray = [];

        getData().then(function(allObjects) {
            allObjects.forEach((el) => {
                namesArray.push(el.resource.fields.name.trim());
            });

            resolve(namesArray);
        }).catch((err) => {
            console.log("Error gettings the names");
            console.log(err);
        });
    });
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