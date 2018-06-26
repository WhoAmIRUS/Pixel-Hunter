import { changeView } from '../tempToElement';
import Header from '../header/header';
import RulesView from './rules_view';
import Application from '../main';

export default class Rules {
  constructor() {
    this.view = new RulesView();
  }
  init() {
    new Header(false).init();
    changeView(this.view);
    this.view.onStart = () => {
      Application.showGame();
    };
  }
}
