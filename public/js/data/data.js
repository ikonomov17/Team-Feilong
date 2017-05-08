import $ from 'jquery';
import { Index } from './indexClass.js';
import * as requester from '../requester.js';
import { FScore } from './FScoreClass.js';

var yql = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Ffinance.yahoo.com%2Fwebservice%2Fv1%2Fsymbols%2Fallcurrencies%2Fquote%3Fformat%3Djson%27&format=json&diagnostics=true&callback='

const LOCALSTORAGE_USERNAME_KEY = "email";
const LOCALSTORAGE_USERID_KEY = "uid";
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

export function getChartData(ticker, period) {
    return fetchDataFromSource(ticker, period).then((data) => {
        const dataObject = getHistoricalDataObject(data, period.number);
        const historicalData = dataObject.historicalData;
        const arrangedData = arrangeData(historicalData);
        const infoData = createInfoObject(dataObject.infoData);
        let sortedData = sortDataByDateAscending(arrangedData);

        return {
            historicalData: sortedData,
            infoData: infoData
        }
    })
}

function createInfoObject(data) {
    const ticker = "ticker:"
    const tickerName = data[1].col0.substr(ticker.length);
    const company = "Company-Name:";
    const companyName = data[2].col0.substr(company.length);
    const exchange = "Exchange-Name:";
    const exchangeName = data[3].col0.substr(exchange.length);
    const unit = "unit:";
    const unitName = data[4].col0.substr(unit.length);
    const currency = "currency:";
    const currencyType = data[6].col0.substr(currency.length);

    return {
        ticker: tickerName,
        companyName: companyName,
        exchangeName: exchangeName,
        unitName: unitName,
        currencyType: currencyType
    }
}


function fetchDataFromSource(ticker, period) {
    /*
        Expect period to be an object with two properties: 
        number(integer) and type(string)(d or m because d - days, m - months) 
    */
    const timePeriod = +period.number;
    const periodType = period.type;
    const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27https%3A%2F%2Fchartapi.finance.yahoo.com%2Finstrument%2F1.0%2F${ticker}%2Fchartdata%3Btype%3Dquote%3Brange%3D${timePeriod}${periodType}%2Fcsv%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;

    return requester.get(url);
};

function getHistoricalDataObject(data, period) {
    const startHistoricalDataObject = 17 + parseInt(period);
    const wholeArray = data.query.results.row;
    const historicalData = wholeArray.slice(startHistoricalDataObject, wholeArray.length - 1);
    const infoObject = wholeArray.slice(0, startHistoricalDataObject);

    return {
        historicalData: historicalData,
        infoData: infoObject
    };
}

function arrangeData(data) {
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

function sortDataByDateAscending(data) {

    let sortedData = data.sort((a, b) => {
        return d3.ascending(a.date, b.date);
    });

    return sortedData;
}

export function setLocalStorage(user) {
    localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, user.email);
    localStorage.setItem(LOCALSTORAGE_USERID_KEY, user.uid);
    localStorage.setItem(LOCALSTORAGE_USERTOKEN_KEY, user.Yd);
    localStorage.setItem(LOCALSTORAGE_DISPLAYNAME_KEY, user.displayName);
}

export function scoreAnalytics(arr) {

    const fScore = new FScore();
    let fScoreResults = fScore.total(arr);
    // console.log(fScoreResults.totalPoints);
    return fScoreResults;
}