import $ from 'jquery';

export let Timer = (function() {
    function updateCurrentUtcTime() {
        let currentUtcTime = new Date().toUTCString();
        $('#time-container').html(currentUtcTime);
    }
    function start() {
        setInterval(updateCurrentUtcTime, 1000);
    }

    let timer = {
        start: start
    } 

    return timer;
})();
