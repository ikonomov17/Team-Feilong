import $ from 'jquery';
import { Index } from './indexClass.js';
import { FScore } from './FScoreClass.js';
import * as requester from '../utils/requester.js';

export let Data = (function Data() {

    function parseTableResponseData(response) {
        const listOfObjects = JSON.parse(response.query.results.body);
        const objectArray = listOfObjects.list.resources;

        return objectArray;
    }

    function fetchTickerDataFromSource(ticker, period) {
        /*
            Expect period to be an object with two properties: 
            number(integer) and type(string)(d or m because d - days, m - months) 
        */
        const timePeriod = +period.number;
        const periodType = period.type;
        const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27https%3A%2F%2Fchartapi.finance.yahoo.com%2Finstrument%2F1.0%2F${ticker}%2Fchartdata%3Btype%3Dquote%3Brange%3D${timePeriod}${periodType}%2Fcsv%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;

        return requester.get(url);
    };

    const ticker = "ticker:"
    const company = "Company-Name:";
    const exchange = "Exchange-Name:";
    const unit = "unit:";
    const currency = "currency:";
    const high = "high:";
    const symbol = "symbol:";

    function createInfoObject(data) {

        const tickerName = data[1].col0.substr(ticker.length);

        const companyName = data[2].col0.substr(company.length);

        const exchangeName = data[3].col0.substr(exchange.length);

        const unitName = data[4].col0.substr(unit.length);

        const currencyType = data[6].col0.substr(currency.length);

        const infoPrice = data[13].col0.substr(high.length);

        return {
            ticker: tickerName,
            companyName: companyName,
            exchangeName: exchangeName,
            unitName: unitName,
            currencyType: currencyType,
            price: infoPrice
        }
    }

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

    const LOCALSTORAGE_USERNAME_KEY = "email";
    const LOCALSTORAGE_USERID_KEY = "uid";
    const LOCALSTORAGE_USERTOKEN_KEY = "token";
    const LOCALSTORAGE_DISPLAYNAME_KEY = "displayName";
    const LOCALSTORAGE_PHOTOURL_KEY = "photoURL";

    function getChartData(...params) {
        const ticker = params[0];
        const period = params[1];
        return fetchTickerDataFromSource(ticker, period).then((data) => {
            const dataObject = getHistoricalDataObject(data, period.number);
            const historicalData = dataObject.historicalData;
            const arrangedData = arrangeData(historicalData);
            const infoData = createInfoObject(dataObject.infoData);
            let sortedData = sortDataByDateAscending(arrangedData);
            return {
                historicalData: sortedData,
                infoData: infoData
            };
        });
    }

    var dataObj = {
        getChartData: getChartData,

        getTableData: function(params) {
            const yahooCurrencies = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Ffinance.yahoo.com%2Fwebservice%2Fv1%2Fsymbols%2Fallcurrencies%2Fquote%3Fformat%3Djson%27&format=json&diagnostics=true&callback=';

            return requester.get(yahooCurrencies)
                .then(resp => {
                    const objectArray = parseTableResponseData(resp);
                    return objectArray;
                })
                .catch(error => toastr.error(`Error getting data: ${error.message}`, 'Yahoo might be down'));
        },

        getIndex: function(ticker) {
            let index;
            const periodData = { number: 1, type: 'd' };
            let data;
            return getChartData(ticker, periodData).then((allData) => {
                data = allData.infoData;
                let history = [];
                let index;
                return new Promise((resolve) => {
                    allData.historicalData.slice(0, 100).forEach((x) => {
                        let object = {
                            low: x.low,
                            high: x.high,
                            open: x.open,
                            close: x.close
                        }
                        history.push(object);
                    })
                    resolve(history)
                })
            }).then(history => {
                const fScoreObj = new FScore();
                let fScore = fScoreObj.total(history);
                const name = data.companyName;
                const price = data.price;
                const currentSymbol = data.ticker;

                index = new Index(name, price, currentSymbol, fScore.totalPoints);
                // console.log(index);
                return index;
            })
        },

        setLocalStorage: function(user) {
            localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, user.email);
            localStorage.setItem(LOCALSTORAGE_USERID_KEY, user.uid);
            localStorage.setItem(LOCALSTORAGE_USERTOKEN_KEY, user.Yd);
            localStorage.setItem(LOCALSTORAGE_DISPLAYNAME_KEY, user.displayName);
            localStorage.setItem(LOCALSTORAGE_PHOTOURL_KEY, user.photoURL);
        },

        scoreAnalytics: function(arr) {
            const fScore = new FScore();
            let fScoreResults = fScore.total(arr);
            // console.log(fScoreResults.totalPoints);
            return fScoreResults;
        }
    }


    return dataObj;
})();