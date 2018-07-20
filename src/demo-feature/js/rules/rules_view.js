import AbstractView from '../view';
import app from '../../index';

export default class RulesView extends AbstractView {
  constructor() {
    super();
    this.template = `
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>`;
  }
  bind() {
    const rulesButton = this.element.querySelector('.rules__button');
    const rulesInput = this.element.querySelector('.rules__input');
    rulesInput.addEventListener('input', () => {
      if (rulesInput.value) {
        rulesButton.disabled = false;
      } else {
        rulesButton.disabled = true;
      }
    });
    rulesButton.addEventListener('click', event => {
      event.preventDefault();
      app.model.userName = rulesInput.value;
      this.onStart();
    });
  }
}
