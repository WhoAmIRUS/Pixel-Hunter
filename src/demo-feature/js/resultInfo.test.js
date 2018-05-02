import assert from 'assert';
import sinon from 'sinon';
import { describe, it } from 'mocha';
import resultInfo, { decreaseLives, decreaseTime } from './resultInfo';
import { currentGame, goToStartGame } from './game';
import './dom.test';

function setZeroTime(clock, startTime, testInfo) {
  Object.assign(testInfo, decreaseTime(resultInfo, startTime));
  while (testInfo.time > 0) {
    clock.tick(1000);
    Object.assign(testInfo, decreaseTime(testInfo, startTime));
  }
}

describe(`Game`, () => {
  describe(`Character lives`, () => {
    it(`should decrease lives`, () => {
      assert.equal(resultInfo.lives - 1, decreaseLives(resultInfo).lives);
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
      assert.equal(
        resultInfo.time - 1,
        decreaseTime(resultInfo, startTime).time,
      );
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
  });
});
