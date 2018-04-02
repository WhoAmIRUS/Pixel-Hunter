import getElementFromTemplate from './tempToElement';
import gameTemplate from './gameTemplate';
import { gameArr } from './main';

function init(callback) {
  const gameTwoElement = getElementFromTemplate(gameTemplate(gameArr[1]));
  const gameAnswer = gameTwoElement.querySelectorAll('.game__answer');
  gameAnswer.forEach(item => {
    item.addEventListener('click', () => {
      if (item.querySelector('input').checked) {
        callback();
      }
    });
  });
}

export default init;
