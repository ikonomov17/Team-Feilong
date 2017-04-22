import 'jquery';

var yql = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Ffinance.yahoo.com%2Fwebservice%2Fv1%2Fsymbols%2Fallcurrencies%2Fquote%3Fformat%3Djson%27&format=json&diagnostics=true&callback='

export function getData(){
    return new Promise((resolve) => {
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

function parseData(jsonString){
    const listOfObjects = JSON.parse(jsonString.query.results.body);
    const objects = listOfObjects.list.resources;
    console.log('2.parse data');
    return objects;
}