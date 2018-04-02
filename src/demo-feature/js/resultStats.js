import stateStats from './stateStats';

const resultStats = Object.assign({}, stateStats, {
  wrong: 1,
  slow: 1,
});

export default resultStats;
