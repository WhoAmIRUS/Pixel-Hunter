import introElement from './intro';
import greetingElement from './greeting';
import rulesElement from './rules';
import gameElement, { goToStartGame } from './game';
import statsElement from './stats';
import { reestablishResultInfo } from './resultInfo';

export const stepsArr = [
  introElement,
  greetingElement,
  rulesElement,
  gameElement,
  statsElement,
];

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

let currentStep = 0;

function goToNextStep() {
  stepsArr[currentStep](goToNextStep);
  currentStep += 1;
}

function goToStart() {
  reestablishResultInfo();
  currentStep = 0;
  goToStartGame();
  stepsArr[currentStep](goToNextStep);
  currentStep += 1;
}

function goToFinal() {
  if (stepsArr.indexOf(statsElement) === -1) {
    throw new Error('No stepsElement in stepsArr');
  } else {
    currentStep = stepsArr.indexOf(statsElement);
  }
}

export { goToFinal, goToStart, goToNextStep, currentStep };
