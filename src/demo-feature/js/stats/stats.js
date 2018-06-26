import { changeView } from '../tempToElement';
import StatsView from './stats-view';

export default class Stats {
  constructor() {
    this.view = new StatsView();
  }
  init() {
    changeView(this.view);
  }
}
