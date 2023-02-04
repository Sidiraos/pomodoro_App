const work = document.querySelector('#work');
const rest = document.querySelector('#rest');
const workTimeMin = document.querySelector('#workTimeMin');
const workTimeSec = document.querySelector('#workTimeSec');
const restTimeMin = document.querySelector('#restTimeMin');
const restTimeSec = document.querySelector('#restTimeSec');
const playBtn = document.querySelector('#play') ;
const resetBtn = document.querySelector('#resetBtn') ;
let interval;
let interval2;



function chrono (minuteTimeUser , secondTimeUser) {
    // minute
    let minuteTime = parseInt(minuteTimeUser.value) ;
    console.log(minuteTime , "mn" , typeof minuteTime) ;
    // seconde
    let count = 59;

    if (secondTimeUser.value == "00") {
        count = 59 ;
        minuteTime = parseInt(minuteTime -1);
    } else {
        count = parseInt(secondTimeUser.value);
    }
    minuteTimeUser.value = minuteTime.toString(); 
    // closure fonction decount
    let decount = () => { 
        console.log(count , "s") ;
        secondTimeUser.value = count.toString();

        if (count == 0 && minuteTime != 0) {

            count = 59 ; 
            minuteTime--;
            console.log(minuteTime , "mn") ;
            secondTimeUser.value = count.toString();
            minuteTimeUser.value = minuteTime.toString();

        } else if (minuteTime == 0 && count == 0) {
            console.log("temps ecoulé : " , minuteTime);
            return "yes";
        }
        return --count;
    };
    return decount ;
}

let buttonClicked = false;

playBtn.addEventListener('click' , handleStartBtn);
function handleStartBtn() {
    if (buttonClicked) {
        pomodoroPause()
        return
    }

    buttonClicked = true ;
    pomodoroPlay() ;
}

function pomodoroPlay() {
    let chrono1 = chrono(workTimeMin , workTimeSec) ;
    triggerWorkPomodoro(chrono1);
    playBtn.innerHTML = `<img src="ressources/pause.svg" alt="" class="w-100"/>`;
    disabledInputSpinButton();
}

function pomodoroPause(){
    console.log('pomodoro pause') ;
    clearInterval(interval);
    playBtn.innerHTML = `<img src="ressources/play.svg" alt="" class="w-100"/>`;
    buttonClicked = false
}

let cycle = 0;
function triggerWorkPomodoro(chrono){
    interval = setInterval(()=> {
        if (chrono() == "yes") {
            clearInterval(interval) ;
            cycle++;
            document.getElementById('cycle').textContent = cycle.toString();
            playBtn.innerHTML = `<img src="ressources/play.svg" alt="" class="w-100"/>`;
            triggerRestPomodoro();
        }
    } , 1000) ;
}

function triggerRestPomodoro() {
    let chrono2 = chrono(restTimeMin , restTimeSec) ;
    playBtn.disabled = true;

    interval2 = setInterval(()=> {
        if (chrono2() == "yes") {
            clearInterval(interval2) ;
            playBtn.disabled = false;
            document.getElementById('form').reset() ;
            enabledInputSpinButton();
        }
    } , 1000) ;
}

resetBtn.addEventListener('click' , resetPomodoro)

function resetPomodoro () { 
    document.getElementById('form').reset();
    cycle = 0;
    document.getElementById('cycle').textContent = cycle.toString();
    buttonClicked = false;
    clearInterval(interval);
    clearInterval(interval2);
    playBtn.innerHTML = `<img src="ressources/play.svg" alt="" class="w-100"/>`;
    playBtn.disabled = false;
    enabledInputSpinButton();

 }

function disabledInputSpinButton () {
    document.querySelectorAll("input[type = number]").forEach(input => input.disabled = true);
}
function enabledInputSpinButton () {
    document.querySelectorAll("input[type = number]").forEach(input => input.disabled = false);
}
