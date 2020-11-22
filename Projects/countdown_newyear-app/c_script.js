var day = document.querySelectorAll('span');

const newYear = "1 jan 2021";

function Act_time(){
    var time_next = new Date(newYear);
    var time_current = new Date();

    var time_seconds = (time_next - time_current)/1000;

    day[0].textContent = parseInt((time_seconds/3600)/24);
    day[1].textContent = parseInt((time_seconds/3600)%24);
    day[2].textContent = parseInt((time_seconds/60)%60);
    day[3].textContent = parseInt((time_seconds)%60);
}

Act_time();

setInterval(Act_time, 1000);