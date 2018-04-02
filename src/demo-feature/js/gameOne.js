import getElementFromTemplate from './tempToElement';
import gameTemplate from './gameTemplate';
import { gameArr } from './main';

function init(callback) {
  const gameOneElement = getElementFromTemplate(gameTemplate(gameArr[0]));
  const gameInput = gameOneElement.querySelectorAll('input');
  gameInput.forEach(item => {
    item.addEventListener('change', () => {
      if (
        gameOneElement.querySelectorAll('input:checked').length ===
        gameArr[0].items.length
      ) {
        callback();
      }
    });
  });
}

export default init;
