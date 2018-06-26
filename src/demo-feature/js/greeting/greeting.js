import { changeView } from '../tempToElement';
import GreetingView from './greeting_view';
import Application from '../main';

export default class Greeting {
  constructor() {
    this.view = new GreetingView();
  }
  init() {
    changeView(this.view);
    this.view.onStart = () => {
      Application.showRules();
    };
  }
}
