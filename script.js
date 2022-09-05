'use strict'

const body = document.querySelector('.body');
const container = document.querySelector('#container');
const startButton = container.querySelector('#start-button');
const resetButton = container.querySelector('#stop-button');

const objTimer = {
  seconds : 0,
  minutes : 0,
  hours : 0
}

let clickCounter = 0;
let stopCounter = 0;

let start;

const timeSet = (type) => {
  if (objTimer.seconds === 60) {
    objTimer.seconds = 0;
    objTimer.minutes++
  }

  if(objTimer.minutes === 60) {
    objTimer.minutes = 0;
    objTimer.hours++
  }

  if (objTimer[type] > 9 && objTimer[type] !== 'hours') {
    return `${objTimer[type]}`
  }

  return `0${objTimer[type]}`
}

function myTimetracker () {
  const tracker = container.querySelector('#tracker');

  objTimer.seconds++;
  tracker.innerHTML = `${timeSet('hours')} : ${timeSet('minutes')} : ${timeSet('seconds')}`;
}

startButton.addEventListener('click', (event) => {
  clickCounter++;

  if (clickCounter <= 1) {
    start = setInterval(myTimetracker, 1000);
  }

  if (clickCounter > 1) {
    clearInterval(start);
    clickCounter = 0;
  }
})

resetButton.addEventListener('click', () => {
  const captureDate = new Date;
  stopCounter++;
  body.insertAdjacentHTML('beforeend', `
    <p>${timeSet('hours')} : ${timeSet('minutes')} : ${timeSet('seconds')} ---- ${captureDate}</p>
  `)
  if (stopCounter >= 1 && clickCounter !== 1) {
    Object.keys(objTimer).map(item => objTimer[item] = 0);
    tracker.innerHTML = `${timeSet('hours')} : ${timeSet('minutes')} : ${timeSet('seconds')}`
    clickCounter = 0;
    stopCounter = 0;
  }
})
