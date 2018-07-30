import { changeView } from '../tempToElement';
import GameView from './game_view';
import { gameArr, goToFinal } from '../main';
import Header from '../header/header';
import { increaseStats, timeStats } from '../resultStats';
import resultInfo, {
  decreaseLives,
  startTimer,
  stopTimer,
} from '../resultInfo';

export default class GamePresenter {
  constructor() {
    this.currentGame = gameArr[0];
    this.view = new GameView(this.currentGame);
  }
  goToNextGame() {
    if (
      gameArr.indexOf(this.currentGame) + 1 === gameArr.length ||
      resultInfo.lives === 0
    ) {
      goToFinal();
      return;
    }
    stopTimer();
    this.currentGame = gameArr[gameArr.indexOf(this.currentGame) + 1];
    this.view = new GameView(this.currentGame);
    this.init();
  }
  init() {
    startTimer(new Header(true).init(), this);
    changeView(this.view);
    this.view.onAnswer = answer => {
      switch (answer) {
        case `correct`:
          GamePresenter.correctAnswer();
          this.goToNextGame();
          break;
        case `wrong`:
          GamePresenter.wrongAnswer();
          this.goToNextGame();
          break;
        default:
          throw new Error(`Strange type of answer`);
      }
    };
  }
  static correctAnswer() {
    timeStats();
  }
  static wrongAnswer() {
    increaseStats(`wrong`);
    decreaseLives();
  }
}
