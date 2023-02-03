const work = document.querySelector('#work');
const rest = document.querySelector('#rest');
const workTimeMin = document.querySelector('#workTimeMin');
const workTimeSec = document.querySelector('#workTimeSec');
const restTimeMin = document.querySelector('#restTimeMin');
const restTimeSec = document.querySelector('#restTimeSec');
const playBtn = document.querySelector('#play') ;
const resetBtn = document.querySelector('#reset') ;
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
    }
    else {
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
            minuteTimeUser.value = minuteTime.toString();

        } else if (minuteTime == 0 && count == 0) {
            console.log("temps ecoulé : " , minuteTime);
            return "yes";
        }
        return --count;
    };
    return decount ;
}

playBtn.addEventListener('click' , handleStartBtn);
function handleStartBtn() {
    pomodoroPlay()
}



function pomodoroPlay() {   
    let chrono1 = chrono(workTimeMin , workTimeSec) ;
    let chrono2 = chrono(restTimeMin , restTimeSec);
    triggerPomodoro(chrono1) ;
    triggerPomodoro (chrono2);
    playBtn.innerHTML = `<img src="ressources/pause.svg" alt="" class="w-100"/>`;
}

function triggerPomodoro(chrono){
    let interval = setInterval(()=> {
        if (chrono() == "yes") {
            clearInterval(interval) ;
        }
    } , 1000) ;
}


