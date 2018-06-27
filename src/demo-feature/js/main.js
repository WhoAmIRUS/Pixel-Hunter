import Intro from './intro/intro';
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Game from './game/game';
import Stats from './stats/stats';
import resultInfo, { reestablishResultInfo, stopTimer } from './resultInfo';
import resultStats, { reestablishResultStats } from './resultStats';

const ControllerID = {
  Intro: ``,
  Greeting: `greeting`,
  Rules: `rules`,
  Game: `game`,
  Stats: `stats`,
};

const getControllerIdFromHash = hash => hash.replace('#', '');

export default class Application {
  constructor() {
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
    this.changeController(getControllerIdFromHash(window.location.hash));
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
    ControllerID.Stats = [
      ControllerID.Stats,
      `=`,
      resultStats.correct,
      resultStats.fast,
      resultInfo.lives,
      resultStats.slow,
      resultStats.wrong,
    ].join('');
    window.location.hash = ControllerID.Stats;
  }
}

export const gameArr = [
  {
    type: `two-of-two`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    items: [
      {
        image: {
          url: 'http://placehold.it/468x458',
          width: 468,
          height: 458,
        },
        type: 'paint',
      },
      {
        image: {
          url: 'http://placehold.it/468x458',
          width: 468,
          height: 458,
        },
        type: 'photo',
      },
    ],
  },
  {
    type: `tinder-like`,
    task: `Угадай, фото или рисунок?`,
    items: [
      {
        image: {
          url: 'http://placehold.it/705x455',
          width: 705,
          height: 455,
        },
        type: 'photo',
      },
    ],
  },
  {
    type: `one-of-three`,
    task: `Найдите рисунок среди изображений`,
    items: [
      {
        image: {
          url: 'http://placehold.it/304x455',
          width: 705,
          height: 455,
        },
        type: 'photo',
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          width: 705,
          height: 455,
        },
        type: 'photo',
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          width: 705,
          height: 455,
        },
        type: 'painting',
      },
    ],
  },
  {
    type: `one-of-three`,
    task: `Найдите рисунок среди изображений`,
    items: [
      {
        image: {
          url: 'http://placehold.it/304x455',
          width: 705,
          height: 455,
        },
        type: 'painting',
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          width: 705,
          height: 455,
        },
        type: 'painting',
      },
      {
        image: {
          url: 'http://placehold.it/304x455',
          width: 705,
          height: 455,
        },
        type: 'photo',
      },
    ],
  },
];

function goToStart() {
  Application.showIntro();
}

function goToFinal() {
  Application.showStats();
}

export { goToFinal, goToStart };
