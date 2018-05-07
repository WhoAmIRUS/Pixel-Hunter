import getElementFromTemplate from './tempToElement';
import statsTemplate from './statsTemplate';
import resultStats from './resultStats';
import resultInfo from './resultInfo';

const screenTemplate = (info, stats, titleMassage) => `
<div class="result">
  <h1>${titleMassage}</h1>
  <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        ${statsTemplate(stats)}
      </td>
      <td class="result__points">×&nbsp;100</td>
      <td class="result__total">${stats.correct * 100}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${
        stats.fast
      }&nbsp;<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">${stats.fast * 50}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${
        info.lives
      }&nbsp;<span class="stats__result stats__result--heart"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">${info.lives * 50}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${
        stats.slow
      }&nbsp;<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">${0 - stats.slow * 50}</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${stats.correct *
        100 +
        stats.fast * 50 +
        info.lives * 50 -
        stats.slow * 50}</td>
    </tr>
  </table>
</div>`;

function init() {
  document.querySelector('#block__header').innerHTML = ``;
  let titleMassage;
  if (resultInfo.lives > 0) {
    titleMassage = `Win`;
  } else {
    titleMassage = `Lose`;
  }
  getElementFromTemplate(screenTemplate(resultInfo, resultStats, titleMassage));
}

export default init;
