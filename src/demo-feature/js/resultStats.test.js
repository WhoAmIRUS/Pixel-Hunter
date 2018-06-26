import assert from 'assert';
import { describe, it } from 'mocha';
import Game from './game/game';
import resultStats, { increaseStats, timeStats } from './resultStats';
import resultInfo from './resultInfo';

describe(`Game stats`, () => {
  describe(`Correct answers`, () => {
    it(`Start correct answer == 0`, () => {
      assert.equal(resultStats.correct, 0);
    });
    it(`Increase correct answer`, () => {
      const newStats = Object.assign({}, resultStats);
      assert.equal(
        increaseStats(`correct`, newStats).correct,
        resultStats.correct + 1,
      );
    });
  });
  describe(`Wrong answer`, () => {
    it(`Start wrong answer == 0`, () => {
      assert.equal(resultStats.wrong, 0);
    });
    it(`Increase wrong answer`, () => {
      const newStats = Object.assign({}, resultStats);
      assert.equal(
        increaseStats(`wrong`, newStats).wrong,
        resultStats.wrong + 1,
      );
    });
  });
  describe(`Slow answer`, () => {
    it(`Start slow answer == 0`, () => {
      assert.equal(resultStats.slow, 0);
    });
    it(`Increase slow answer`, () => {
      const newStats = Object.assign({}, resultStats);
      const newInfo = Object.assign({}, resultInfo, {
        time: 1,
      });
      assert.equal(timeStats(newStats, newInfo).slow, resultStats.slow + 1);
    });
  });
  describe(`Fast answer`, () => {
    it(`Start fast answer == 0`, () => {
      assert.equal(resultStats.fast, 0);
    });
    it(`Increase fast answer`, () => {
      const newStats = Object.assign({}, resultStats);
      const newInfo = Object.assign({}, resultInfo, {
        time: 29,
      });
      assert.equal(timeStats(newStats, newInfo).fast, resultStats.fast + 1);
    });
  });
});
