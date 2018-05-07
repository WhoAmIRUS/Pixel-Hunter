import assert from 'assert';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import resultInfo, {
  decreaseLives,
  decreaseTime,
  reestablishResultInfo,
} from './resultInfo';
import { currentGame, goToStartGame } from './game';
import './dom.test';

function setZeroTime(clock, startTime, testInfo) {
  Object.assign(testInfo, resultInfo);
  while (testInfo.time > 0) {
    clock.tick(1000);
    Object.assign(testInfo, decreaseTime(startTime, testInfo));
  }
}

describe(`Game`, () => {
  describe(`Character lives`, () => {
    it(`should decrease lives`, () => {
      const info = Object.assign({}, resultInfo);
      decreaseLives(info);
      assert.equal(resultInfo.lives - 1, info.lives);
    });
    it(`start lives equal 3`, () => {
      assert.equal(resultInfo.lives, 3);
    });
  });
  describe(`Character time`, () => {
    it(`should decrease time`, () => {
      const clock = sinon.useFakeTimers();
      const startTime = Date.now();
      clock.tick(1000);
      const info = Object.assign({}, resultInfo);
      decreaseTime(startTime, info);
      assert.equal(resultInfo.time - 1, info.time);
      clock.restore();
    });
    it(`start time equal 30`, () => {
      assert.equal(resultInfo.time, 30);
    });

    it(`next game step when time == 0`, () => {
      goToStartGame();
      const clock = sinon.useFakeTimers();
      const startTime = Date.now();
      const stepIndex = currentGame;
      const testInfo = {};
      setZeroTime(clock, startTime, testInfo);
      assert.equal(currentGame, stepIndex + 1);
      clock.restore();
    });
    it(`decrease lives when time == 0`, () => {
      goToStartGame();
      const clock = sinon.useFakeTimers();
      const startTime = Date.now();
      const lives = resultInfo.lives;
      const testInfo = {};
      setZeroTime(clock, startTime, testInfo);
      assert.equal(resultInfo.lives, lives - 1);
      clock.restore();
    });
    it(`decrease lives when time == 0 (double)`, () => {
      reestablishResultInfo();
      goToStartGame();
      let clock = sinon.useFakeTimers();
      let startTime = Date.now();
      const lives = resultInfo.lives;
      let testInfo = {};
      setZeroTime(clock, startTime, testInfo);
      clock.restore();
      clock = sinon.useFakeTimers();
      startTime = Date.now();
      testInfo = {};
      setZeroTime(clock, startTime, testInfo);
      assert.equal(resultInfo.lives, lives - 2);
      clock.restore();
    });
  });
});
