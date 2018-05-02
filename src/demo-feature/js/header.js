import _ from '../../../node_modules/lodash';
import getElementFromTemplate from './tempToElement';
import resultInfo, { stopTimer } from './resultInfo';
import { goToStart } from './main';

const headerTemplate = (data, isFullHeader) =>
  _.template(`
<header class="header">
  <div class="header__back">
    <span class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      <img src="img/logo_small.png" width="101" height="44">
    </span>
  </div>
  <% if(isFullHeader) {%>
  <h1 class="game__timer">${data.time}</h1>
  <div class="game__lives">
    ${new Array(3 - data.lives)
      .fill(
        '<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">',
      )
      .join(``)}
      ${new Array(data.lives)
        .fill(
          '<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">',
        )
        .join(``)}
  </div>
  <%}%>
</header>`)({ data, isFullHeader });

function init(isFullHeader) {
  const headerElement = getElementFromTemplate(
    headerTemplate(resultInfo, isFullHeader),
    '#block__header',
  );
  const headerBack = headerElement.querySelector('.header__back');
  headerBack.addEventListener('click', () => {
    document.querySelector('#block__header').innerHTML = ``;
    stopTimer();
    goToStart();
  });
  return headerElement;
}

export default init;
