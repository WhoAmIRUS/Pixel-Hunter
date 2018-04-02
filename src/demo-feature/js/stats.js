import getElementFromTemplate from './tempToElement';
import statsTemplate from './statsTemplate';
import resultStats from './resultStats';
import resultInfo from './resultInfo';

const screenTemplate = `
<div class="result">
  <h1>Победа!</h1>
  <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        ${statsTemplate(resultStats)}
      </td>
      <td class="result__points">×&nbsp;100</td>
      <td class="result__total">900</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${
        resultStats.fast
      }&nbsp;<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">${resultStats.fast * 50}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${
        resultInfo.lives
      }&nbsp;<span class="stats__result stats__result--heart"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">${resultInfo.lives * 50}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${
        resultStats.slow
      }&nbsp;<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">-${resultStats.slow * 50}</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">950</td>
    </tr>
  </table>
  <table class="result__table">
    <tr>
      <td class="result__number">2.</td>
      <td>
        ${statsTemplate(resultStats)}
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>
  </table>
  <table class="result__table">
    <tr>
      <td class="result__number">3.</td>
      <td colspan="2">
        ${statsTemplate(resultStats)}
      </td>
      <td class="result__points">×&nbsp;100</td>
      <td class="result__total">900</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${
        resultInfo.lives
      }&nbsp;<span class="stats__result stats__result--heart"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">${resultInfo.lives * 50}</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">950</td>
    </tr>
  </table>
</div>`;

function init() {
  document.querySelector('#block__header').innerHTML = ``;
  getElementFromTemplate(screenTemplate);
}

export default init;
