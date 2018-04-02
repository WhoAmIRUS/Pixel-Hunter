import stateInfo from './stateInfo';

const resultInfo = Object.assign({}, stateInfo, {
  time: 100,
  lives: stateInfo.lives - 1,
});

export default resultInfo;
