import $ from 'jquery';

function updateCurrentUtcTime() {
    let currentUtcTime = new Date().toUTCString();
    $('#time-container')
        .html(currentUtcTime);
}

const timer = {
    start() {
        setInterval(updateCurrentUtcTime, 1000);
    }
}

export { timer };