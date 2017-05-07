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
        .catch(error => toastr.error(`Error getting data: ${error.message}`, 'Yahoo might be down'));
}

export function getOnlyNames() {
    return getData()
        .then(allObjects => allObjects.map(obj => obj.resource.fields.name.trim()))
        .catch((error) => toastr.error(`Error gettings the names: ${error.message}`));
}

export function getChartData(ticker,period){
    return fetchDataFromSource(ticker,period).then((data) =>{
        const dataObject = getHistoricalDataObject(data);
        const arrangedData = arrangeData(dataObject);
        let sortedData = sortDataByDateAscending(arrangedData);
        return sortedData;
    })
}

function fetchDataFromSource(ticker,period){
    /*
        Expect period to be an object with two properties: 
        number(integer) and type(string)(d or m because d - days, m - months) 
    */
    const timePeriod = +period.number;
    const periodType = period.type;
    console.log(ticker);
    console.log(timePeriod);
    console.log(periodType);
    const url =`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27https%3A%2F%2Fchartapi.finance.yahoo.com%2Finstrument%2F1.0%2F${ticker}%2Fchartdata%3Btype%3Dquote%3Brange%3D${timePeriod}${periodType}%2Fcsv%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;
console.log(url)
	return requester.get(url);
};

function getHistoricalDataObject(data){
    return data.query.results.row;
}

function arrangeData(data){
    data = data.slice(100, data.length - 1);
	let arrangedData = data.map(function(d) {
        return {
            date: new Date(d.col0 * 1000),
            volume: +d.col5,
            open: +d.col4,
            high: +d.col2,
            low: +d.col3,
            close: +d.col1
        };
    });

	return arrangedData;
}

function sortDataByDateAscending(data){

	let sortedData = data.sort((a, b) => { 
        return d3.ascending(a.date, b.date); 
    });

	return sortedData;
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