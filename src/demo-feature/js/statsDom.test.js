import jsdom from 'jsdom';
import assert from 'assert';
import { describe, it } from 'mocha';
import Stats from './stats/stats';
import resultStats, {
  increaseStats,
  reestablishResultStats,
} from './resultStats';
import resultInfo, { decreaseLives, reestablishResultInfo } from './resultInfo';
import { goToFinal } from './main';

const { JSDOM } = jsdom;
const dom = new JSDOM(
  '<html><body><main class="central">\n' +
    '    <div id="block__header"></div>\n' +
    '    <div id="block__content"></div>\n' +
    '    <div id="block__footer"></div>\n' +
    '  </main></body></html>',
);

global.window = dom.window;
global.document = dom.window.document;

describe(`DOM stats`, () => {
  describe(`Calc correct answers`, () => {
    it(`Calc correct >= 0`, () => {
      for (let i = 0; i < 10; i++) {
        increaseStats(`correct`);
        new Stats().init();
        const res = resultStats.correct * 100;
        assert.equal(
          +document.querySelectorAll(`.result__total`)[0].innerHTML,
          res,
        );
      }
      reestablishResultStats();
    });
  });
  describe(`Calc fast answers`, () => {
    it(`Calc fast >= 0`, () => {
      for (let i = 0; i < 10; i++) {
        increaseStats(`fast`);
        new Stats().init();
        const res = resultStats.fast * 50;
        assert.equal(
          +document.querySelectorAll(`.result__total`)[1].innerHTML,
          res,
        );
      }
      reestablishResultStats();
    });
  });
  describe(`Calc lives answers`, () => {
    it(`Calc lives <= 3`, () => {
      while (resultInfo.lives) {
        decreaseLives();
        new Stats().init();
        const res = resultInfo.lives * 50;
        assert.equal(
          +document.querySelectorAll(`.result__total`)[2].innerHTML,
          res,
        );
      }
      reestablishResultInfo();
    });
  });
  describe(`Calc slow answers`, () => {
    it(`Calc slow >= 0`, () => {
      for (let i = 0; i < 10; i++) {
        increaseStats(`slow`);
        goToFinal();
        new Stats().init();
        const res = resultStats.slow * 50;
        assert.equal(
          +document.querySelectorAll(`.result__total`)[3].innerHTML,
          -res,
        );
      }
      reestablishResultStats();
    });
  });
  describe(`Calc total answers`, () => {
    it(`Calc random total`, () => {
      for (let i = 0; i < 10; i++) {
        switch (Math.floor(Math.random() * (5 - 1)) + 1) {
          case 1:
            increaseStats(`correct`);
            break;
          case 2:
            increaseStats(`fast`);
            break;
          case 3:
            if (resultInfo.lives > 0) decreaseLives();
            break;
          case 4:
            increaseStats(`slow`);
            break;
        }
      }
      const res =
        resultStats.correct * 100 +
        resultStats.fast * 50 +
        resultInfo.lives * 50 -
        resultStats.slow * 50;
      new Stats().init();
      console.log(
        document.querySelectorAll(`.result__total--final`)[0].innerHTML,
      );
      assert.equal(
        +document.querySelectorAll(`.result__total--final`)[0].innerHTML,
        res,
      );
      reestablishResultStats();
      reestablishResultInfo();
    });
  });
});
