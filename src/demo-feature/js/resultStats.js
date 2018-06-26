import stateStats from './stateStats';
import stateInfo from './stateInfo';
import resultInfo from './resultInfo';

const resultStats = Object.assign({}, stateStats);

export function increaseStats(statsValue, statsCopy = resultStats) {
  statsCopy[statsValue] = statsCopy[statsValue] + 1;
  return statsCopy;
}
export function timeStats(statsCopy = resultStats, info = resultInfo) {
  let statsValue;
  if (info.time >= stateInfo.time - 10) {
    statsValue = `fast`;
  }
  if (info.time <= stateInfo.time - 20) {
    statsValue = `slow`;
  }
  return increaseStats(statsValue, statsCopy);
}
export function reestablishResultStats() {
  Object.assign(resultStats, stateStats);
}

export default resultStats;
