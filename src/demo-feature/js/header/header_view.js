import AbstractView from '../view';
import _ from '../../../../node_modules/lodash/lodash';
import resultInfo from '../resultInfo';
import { goToStart } from '../main';

export default class HeaderView extends AbstractView {
  constructor(isFullHeader = false, content = '#block__header') {
    super(content);
    this.isFullHeader = isFullHeader;
    this.block = content;
    this.template = _.template(`
      <header class="header">
        <div class="header__back">
          <span class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.png" width="101" height="44">
          </span>
        </div>
        <% if(isFullHeader) {%>
        <h1 class="game__timer">${resultInfo.time}</h1>
        <div class="game__lives">
          ${new Array(3 - resultInfo.lives)
            .fill(
              '<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">',
            )
            .join(``)}
            ${new Array(resultInfo.lives)
              .fill(
                '<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">',
              )
              .join(``)}
        </div>
        <%}%>
      </header>`)({ isFullHeader: this.isFullHeader });
  }
  bind() {
    const headerBack = this.element.querySelector('.header__back');
    headerBack.addEventListener('click', () => {
      document.querySelector('#block__header').innerHTML = ``;
      goToStart();
    });
  }
}
