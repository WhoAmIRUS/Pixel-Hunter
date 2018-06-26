import AbstractView from '../view';

export default class IntroView extends AbstractView {
  constructor() {
    super();
    this.template = `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>`;
  }
  bind() {
    const intro = this.element.querySelector('.intro__asterisk');
    intro.addEventListener('click', () => {
      this.onStart();
    });
  }
}
