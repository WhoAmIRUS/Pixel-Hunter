import stateInfo from './stateInfo';
import stateStats from './stateStats';
import resultInfo from './resultInfo';

const resultStats = Object.assign({}, stateStats);

export function increaseStats(statsValue, stats = resultStats) {
  stats[statsValue] = stats[statsValue] + 1;
  return stats;
}

export function timeStats(stats = resultStats, info = resultInfo) {
  let statsValue;
  if (info.time >= stateInfo.time - 10) {
    statsValue = `fast`;
  }
  if (info.time <= stateInfo.time - 20) {
    statsValue = `slow`;
  }
  return increaseStats(statsValue, stats);
}

export function reestablishResultStats() {
  Object.assign(resultStats, stateStats);
}

export default resultStats;
