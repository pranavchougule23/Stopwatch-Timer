// ===============================
// Stopwatch
// ===============================

let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);

// ===============================
// Start Stopwatch
// ===============================

function startStopwatch(){

    if(timer !== null){
        return;
    }

    timer = setInterval(updateTime,1000);

}

// ===============================
// Update Time
// ===============================

function updateTime(){

    seconds++;

    if(seconds == 60){

        seconds = 0;
        minutes++;

    }

    if(minutes == 60){

        minutes = 0;
        hours++;

    }

    display.innerHTML =
        format(hours) + ":" +
        format(minutes) + ":" +
        format(seconds);

}

// ===============================
// Pause Stopwatch
// ===============================

function pauseStopwatch(){

    clearInterval(timer);

    timer = null;

}

// ===============================
// Reset Stopwatch
// ===============================

function resetStopwatch(){

    clearInterval(timer);

    timer = null;

    hours = 0;
    minutes = 0;
    seconds = 0;

    display.innerHTML = "00:00:00";

    laps.innerHTML = "";

    localStorage.removeItem("laps");

}

// ===============================
// Format Time
// ===============================

function format(value){

    return value < 10 ? "0" + value : value;

}

// ===============================
// Lap
// ===============================

function addLap(){

    if(hours==0 && minutes==0 && seconds==0){
        return;
    }

    const lapTime =
        format(hours)+":"+
        format(minutes)+":"+
        format(seconds);

    const lap =
    document.createElement("div");

    lap.className = "lap-item";

    lap.innerHTML = lapTime;

    laps.appendChild(lap);

    saveLaps();

}

// ===============================
// Save Laps
// ===============================

function saveLaps(){

    let data=[];

    document.querySelectorAll(".lap-item").forEach(item=>{

        data.push(item.innerHTML);

    });

    localStorage.setItem(
        "laps",
        JSON.stringify(data)
    );

}

// ===============================
// Load Laps
// ===============================

window.onload = function(){

    const data =
    JSON.parse(localStorage.getItem("laps")) || [];

    data.forEach(time=>{

        const lap =
        document.createElement("div");

        lap.className="lap-item";

        lap.innerHTML=time;

        laps.appendChild(lap);

    });

}
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