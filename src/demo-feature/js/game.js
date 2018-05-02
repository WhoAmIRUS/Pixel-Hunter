import getElementFromTemplate from './tempToElement';
import gameTemplate from './gameTemplate';
import { gameArr, goToNextStep } from './main';
import { decreaseResultInfoLives, startTimer, stopTimer } from './resultInfo';
import headerElement from './header';
import { increaseStats, timeStats } from './resultStats';

let mainStep;

let currentGame = 0;

function goToNextGame() {
  stopTimer();
  currentGame += 1;
  initGame();
}

function goToStartGame() {
  currentGame = 0;
}

export { goToStartGame, goToNextGame, currentGame };

function initGame() {
  if (currentGame === gameArr.length) {
    stopTimer();
    goToNextStep();
    return;
  }
  startTimer(headerElement(true));
  const gameElement = getElementFromTemplate(
    gameTemplate(gameArr[currentGame]),
  );
  const gameAnswer = gameElement.querySelectorAll('.game__answer');
  const gameOption = gameElement.querySelectorAll('.game__option');
  switch (gameArr[currentGame].type) {
    case 'two-of-two':
      gameAnswer.forEach(item => {
        item.addEventListener('change', () => {
          const gameCheckedElements = gameElement.querySelectorAll(
            'input:checked',
          );
          if (
            gameCheckedElements.length === gameArr[currentGame].items.length
          ) {
            for (let i = 0; i < gameCheckedElements.length; i += 1) {
              if (
                gameArr[currentGame].items[i].type !==
                gameCheckedElements[i].value
              ) {
                decreaseResultInfoLives();
                increaseStats(`wrong`);
                goToNextGame();
                return;
              }
            }
            increaseStats(`correct`);
            timeStats();
            goToNextGame();
          }
        });
      });
      break;
    case 'tinder-like':
      gameAnswer.forEach(item => {
        item.addEventListener('change', () => {
          const gameCheckedElement = gameElement.querySelector('input:checked');
          if (item.querySelector('input').checked) {
            if (
              gameArr[currentGame].items[0].type !== gameCheckedElement.value
            ) {
              decreaseResultInfoLives();
              increaseStats(`wrong`);
            } else {
              increaseStats(`correct`);
              timeStats();
            }
            goToNextGame();
          }
        });
      });
      break;
    case 'one-of-three':
      gameOption.forEach((item, index) => {
        item.addEventListener('click', () => {
          if (gameArr[currentGame].items[index].type !== 'painting') {
            decreaseResultInfoLives();
            increaseStats(`wrong`);
          } else {
            increaseStats(`correct`);
            timeStats();
          }
          goToNextGame();
        });
      });
      break;
    default:
      throw new Error(
        'next type of game in array not equal saved types of games',
      );
  }
}

function init(callback) {
  mainStep = callback;
  if (currentGame !== gameArr.length) {
    initGame();
  } else {
    mainStep();
  }
}

export default init;
