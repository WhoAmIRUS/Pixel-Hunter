import { changeView } from '../tempToElement';
import IntroView from './intro_view';
import Application from '../main';

export default class Intro {
  constructor() {
    this.view = new IntroView();
  }
  init() {
    changeView(this.view);
    this.view.onStart = () => {
      Application.showGreeting();
    };
  }
}
