import stateInfo from './stateInfo';
import { goToFinal } from './main';
import { goToNextGame } from './game';

const resultInfo = Object.assign({}, stateInfo);
let timer;

export function decreaseLives(info = resultInfo) {
  Object.assign(info, {
    lives: info.lives - 1,
  });
  if (info.lives < 0) {
    throw new Error(`Can't be negative lives`);
  }
  if (info.lives === 0) {
    goToFinal();
  }
  return info;
}

export function reestablishResultInfo() {
  Object.assign(resultInfo, stateInfo);
}

export function stopTimer() {
  if (timer) {
    clearInterval(timer);
    Object.assign(resultInfo, {
      time: stateInfo.time,
    });
  }
}

export function decreaseTime(startDate, info = resultInfo) {
  const currentDate = Date.now();
  Object.assign(info, {
    time: stateInfo.time - Math.ceil((currentDate - startDate) / 1000),
  });
  if (info.time < 0) {
    throw new Error(`Can't be negative time`);
  }
  if (info.time === 0) {
    stopTimer();
    decreaseLives();
    goToNextGame();
  }
  return info;
}

export function startTimer(domHeaderElement) {
  const gameTimer = domHeaderElement.querySelector('.game__timer');
  if (!gameTimer) {
    throw new Error(`Name of timer's class is not .game__timer`);
  }
  const startDate = Date.now();
  timer = setInterval(() => {
    decreaseTime(startDate);
    gameTimer.innerHTML = resultInfo.time;
  }, 500);
}

export default resultInfo;
