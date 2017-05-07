//Hasher saves previous hash so when login window is closed
//the app stays on the correct window
//let this snippet run before your hashchange event binding code
//https://developer.mozilla.org/en/docs/Web/API/WindowEventHandlers/onhashchange

const hashHistory = [];

if (!window.HashChangeEvent)(function() {
    var lastURL = document.URL;
    window.addEventListener("hashchange", function(event) {
        Object.defineProperty(event, "oldURL", { enumerable: true, configurable: true, value: lastURL });
        Object.defineProperty(event, "newURL", { enumerable: true, configurable: true, value: document.URL });
        lastURL = document.URL;
    });
}());

function locationHashChanged() {
    hashHistory.push(event.oldURL.split('#')[1]);
    //console.log(event.oldURL);
    //console.log(event.newURL);
    //console.log(hashTuple);
}

window.onhashchange = locationHashChanged;

export { hashHistory }