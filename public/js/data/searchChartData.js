import * as requester from '../requester.js';

class searchChart {

    static getSearchedData(query) {
        let url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%27http%3A%2F%2Fd.yimg.com%2Faq%2Fautoc%3Fquery%3D${query}%26region%3DUS%26lang%3Den-US%27&format=json&callback=`;

        return requester.get(url).then((data) => {
            const response = searchChart.getOnlyNeededObject(data);
            return response;
        });
    };

    static getOnlyNeededObject(obj) {
        let firstObject = JSON.parse(obj.query.results.body);
        let resultObjectArray = firstObject.ResultSet.Result;
        //let currentSearch = {};
        let symbolsArray = [];
        //let namesArray = [];

        resultObjectArray.forEach(x => {
            symbolsArray.push(x.symbol);
        })

        return symbolsArray;
    }

}

export {
    searchChart
};