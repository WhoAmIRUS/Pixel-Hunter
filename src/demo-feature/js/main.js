import introElement from './intro';
import greetingElement from './greeting';
import rulesElement from './rules';
import gameOneElement from './gameOne';
import footerElement from './footer';
import gameTwoTemplate from './gameTwo';
import gameThreeTemplate from './gameThree';
import statsElement from './stats';

export const stepsArr = [
  introElement,
  greetingElement,
  rulesElement,
  gameOneElement,
  gameTwoTemplate,
  gameThreeTemplate,
  statsElement,
];

export const gameArr = [
  {
    type: `two-of-two`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    items: [
      {
        image: 'http://placehold.it/468x458',
        width: 468,
        height: 458,
      },
      {
        image: 'http://placehold.it/468x458',
        width: 468,
        height: 458,
      },
    ],
  },
  {
    type: `tinder-like`,
    task: `Угадай, фото или рисунок?`,
    items: [
      {
        image: 'http://placehold.it/705x455',
        width: 705,
        height: 455,
      },
    ],
  },
  {
    type: `one-of-three`,
    task: `Найдите рисунок среди изображений`,
    items: [
      {
        image: 'http://placehold.it/304x455',
        width: 304,
        height: 455,
      },
      {
        image: 'http://placehold.it/304x455',
        width: 304,
        height: 455,
      },
      {
        image: 'http://placehold.it/304x455',
        width: 304,
        height: 455,
      },
    ],
  },
];

let currentStep = 0;

function goToNextStep() {
  console.log(currentStep);
  stepsArr[currentStep](goToNextStep);
  currentStep += 1;
}

export function goToStart() {
  currentStep = 0;
  stepsArr[currentStep](goToNextStep);
  currentStep += 1;
}

goToNextStep();
footerElement();
