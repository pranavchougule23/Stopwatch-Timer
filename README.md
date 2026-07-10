// ===============================
// Countdown Timer
// ===============================

let countdown = null;

const timerBtn = document.getElementById("timerBtn");
const timerDisplay = document.getElementById("timerDisplay");

timerBtn.addEventListener("click", startTimer);

function startTimer(){

    clearInterval(countdown);

    let mins =
    parseInt(document.getElementById("minutes").value) || 0;

    let secs =
    parseInt(document.getElementById("seconds").value) || 0;

    let totalSeconds =
    (mins * 60) + secs;

    if(totalSeconds <= 0){

        alert("Enter a valid time.");

        return;

    }

    updateTimerDisplay(totalSeconds);

    countdown = setInterval(function(){

        totalSeconds--;

        updateTimerDisplay(totalSeconds);

        if(totalSeconds <= 0){

            clearInterval(countdown);

            timerDisplay.innerHTML = "00:00";

            alert("⏰ Time's Up!");

        }

    },1000);

}

function updateTimerDisplay(totalSeconds){

    const mins =
    Math.floor(totalSeconds / 60);

    const secs =
    totalSeconds % 60;

    timerDisplay.innerHTML =
        format(mins) + ":" +
        format(secs);

}