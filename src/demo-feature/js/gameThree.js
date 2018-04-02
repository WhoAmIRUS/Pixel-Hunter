import getElementFromTemplate from './tempToElement';
import gameTemplate from './gameTemplate';
import { gameArr } from './main';

function init(callback) {
  const gameTreeElement = getElementFromTemplate(gameTemplate(gameArr[2]));
  const gameOption = gameTreeElement.querySelectorAll('.game__option');
  gameOption.forEach(item => {
    item.addEventListener('click', () => {
      callback();
    });
  });
}

export default init;
