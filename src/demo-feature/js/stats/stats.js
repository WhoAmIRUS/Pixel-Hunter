import { changeView } from '../tempToElement';
import StatsView from './stats-view';
import resultInfo from '../resultInfo';
import resultStats from '../resultStats';

export default class Stats {
  constructor() {
    Stats.decodeHash();
    this.view = new StatsView(this.titleMassage);
  }
  static get titleMassage() {
    if (resultInfo.lives > 0) {
      return `Win`;
    }
    return `Lose`;
  }
  static decodeHash() {
    const hash = window.location.hash;
    const start = hash.indexOf('=');
    if (start !== -1) {
      [
        resultStats.correct,
        resultStats.fast,
        resultInfo.lives,
        resultStats.slow,
        resultStats.wrong,
      ] = hash
        .slice(start + 1)
        .split('')
        .map(e => +e);
    }
  }
  init() {
    changeView(this.view);
  }
}
