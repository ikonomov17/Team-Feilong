import 'jquery';


function updateCurrentUtcTime() {
    let currentUtcTime = new Date().toUTCString(); 
    $('#time-container')
            .html(currentUtcTime);
}

export function startUpdatingTime(){
    setInterval(updateCurrentUtcTime,1000);
}