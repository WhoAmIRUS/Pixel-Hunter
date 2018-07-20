import Intro from './intro/intro';
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';
import resultInfo, { reestablishResultInfo, stopTimer } from './resultInfo';
import resultStats, { reestablishResultStats } from './resultStats';
import Model from './model';
import app from '../index';

export function showPreloader() {
  const content = document.querySelector('#block__content');
  const img = document.createElement('img');
  img.setAttribute('src', 'img/preloader.svg');
  img.setAttribute('class', 'preloader');
  content.innerHTML = ``;
  content.appendChild(img);
}

export function removePreloader() {
  const content = document.querySelector('#block__content');
  content.innerHTML = ``;
}

const ControllerID = {
  Intro: ``,
  Greeting: `greeting`,
  Rules: `rules`,
  Game: `game`,
  Stats: `stats`,
};

export let gameArr;

const getControllerIdFromHash = hash => hash.replace('#', '');

export default class Application {
  constructor() {
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
      }
      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${
          this.userName
        }`;
      }
      set userName(name) {
        this._userName = name;
      }
      get userName() {
        return this._userName;
      }
    }();
    this.routes = {
      [ControllerID.Intro]: Intro,
      [ControllerID.Greeting]: Greeting,
      [ControllerID.Rules]: Rules,
      [ControllerID.Game]: Game,
      [ControllerID.Stats]: Stats,
    };
    window.onhashchange = () => {
      this.changeController(getControllerIdFromHash(window.location.hash));
    };
  }
  changeController(route = ``) {
    stopTimer();
    if (route.indexOf('=') !== -1) {
      route = route.slice(0, route.indexOf('='));
    }
    new this.routes[route]().init();
  }
  init() {
    showPreloader();
    this.model
      .load()
      .then(data => {
        gameArr = data.slice();
      })
      .then(() => removePreloader())
      .then(() =>
        this.changeController(getControllerIdFromHash(window.location.hash)),
      )
      .catch(() => {
        throw new Error(`Request error`);
      });
  }
  static showIntro() {
    window.location.hash = ControllerID.Intro;
  }
  static showGreeting() {
    window.location.hash = ControllerID.Greeting;
  }
  static showRules() {
    window.location.hash = ControllerID.Rules;
  }
  static showGame() {
    reestablishResultStats();
    reestablishResultInfo();
    window.location.hash = ControllerID.Game;
  }
  static showStats() {
    const newStatsID = [
      ControllerID.Stats,
      `=`,
      resultStats.correct,
      resultStats.fast,
      resultInfo.lives,
      resultStats.slow,
      resultStats.wrong,
    ].join('');
    window.location.hash = newStatsID;
  }
}

function goToStart() {
  Application.showIntro();
}

function goToFinal() {
  app.model.send(
    JSON.stringify({
      stats: resultStats,
      lives: resultInfo.lives,
    }),
  );
  Application.showStats();
}

export { goToFinal, goToStart };
