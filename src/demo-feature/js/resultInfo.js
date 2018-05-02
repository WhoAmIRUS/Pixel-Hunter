import stateInfo from './stateInfo';
import { goToFinal } from './main';
import { goToNextGame } from './game';

const resultInfo = Object.assign({}, stateInfo);
let timer;

export function decreaseLives(info) {
  const newInfo = Object.assign({}, info, {
    lives: info.lives - 1,
  });
  if (newInfo.lives < 0) {
    throw new Error(`Can't be negative lives`);
  }
  if (newInfo.lives === 0) {
    goToFinal();
  }
  return newInfo;
}

export function decreaseResultInfoLives() {
  Object.assign(resultInfo, decreaseLives(resultInfo));
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

export function decreaseTime(info, startDate) {
  const currentDate = Date.now();
  const newInfo = Object.assign({}, info, {
    time: stateInfo.time - Math.ceil((currentDate - startDate) / 1000),
  });
  if (newInfo.time < 0) {
    throw new Error(`Can't be negative time`);
  }
  if (newInfo.time === 0) {
    stopTimer();
    goToNextGame();
  }
  return newInfo;
}

export function decreaseResultInfoTime(startDate) {
  Object.assign(resultInfo, decreaseTime(resultInfo, startDate));
}

export function startTimer(domHeaderElement) {
  const gameTimer = domHeaderElement.querySelector('.game__timer');
  if (!gameTimer) {
    throw new Error(`Name of timer's class is not .game__timer`);
  }
  const startDate = Date.now();
  timer = setInterval(() => {
    decreaseResultInfoTime(startDate);
    gameTimer.innerHTML = resultInfo.time;
  }, 500);
}

export default resultInfo;
