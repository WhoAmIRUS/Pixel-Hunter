import jsdom from 'jsdom';
import assert from 'assert';
import { describe, it } from 'mocha';
import statsElement from './stats';
import resultStats, {
  increaseStats,
  reestablishResultStats,
} from './resultStats';
import resultInfo, { decreaseLives, reestablishResultInfo } from './resultInfo';

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
      reestablishResultStats();
      for (let i = 0; i < 10; i++) {
        increaseStats(`correct`);
        statsElement();
        const res = resultStats.correct * 100;
        assert.equal(
          +document.querySelectorAll(`.result__total`)[0].innerHTML,
          res,
        );
      }
    });
  });
  describe(`Calc fast answers`, () => {
    it(`Calc fast >= 0`, () => {
      reestablishResultStats();
      for (let i = 0; i < 10; i++) {
        increaseStats(`fast`);
        statsElement();
        const res = resultStats.fast * 50;
        assert.equal(
          +document.querySelectorAll(`.result__total`)[1].innerHTML,
          res,
        );
      }
    });
  });
  describe(`Calc lives answers`, () => {
    it(`Calc lives <= 3`, () => {
      reestablishResultInfo();
      for (let i = 0; i < resultInfo.lives; i++) {
        decreaseLives();
        statsElement();
        const res = resultInfo.lives * 50;
        assert.equal(
          +document.querySelectorAll(`.result__total`)[2].innerHTML,
          res,
        );
      }
    });
  });
  describe(`Calc slow answers`, () => {
    it(`Calc slow >= 0`, () => {
      reestablishResultStats();
      for (let i = 0; i < 10; i++) {
        increaseStats(`slow`);
        statsElement();
        const res = resultStats.slow * 50;
        assert.equal(
          +document.querySelectorAll(`.result__total`)[3].innerHTML,
          -res,
        );
      }
    });
  });
  describe(`Calc total answers`, () => {
    it(`Calc random total`, () => {
      reestablishResultStats();
      for (let i = 0; i < 10; i++) {
        switch (Math.floor(Math.random() * (4 - 1)) + 1) {
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
      statsElement();
      assert.equal(
        +document.querySelectorAll(`.result__total--final`)[0].innerHTML,
        res,
      );
    });
  });
});
