import AbstractView from '../view';
import statsTemplate from '../statsTemplate';
import resultInfo from '../resultInfo';
import resultStats from '../resultStats';

export default class StatsView extends AbstractView {
  constructor(titleMassage = `Win`) {
    super();
    this.titleMassage = titleMassage;
    this.template = `
    <div class="result">
      <h1>${this.titleMassage}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${statsTemplate(resultStats)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${resultStats.correct * 100 +
            resultStats.fast * 100 +
            resultStats.slow * 100}
          </td>
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
          <td class="result__total">${0 - resultStats.slow * 50}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${resultStats.correct *
            100 +
            resultStats.fast * 150 +
            resultInfo.lives * 50 +
            resultStats.slow * 50}</td>
        </tr>
      </table>
    </div>`;
  }
  bind() {
    document.querySelector('#block__header').innerHTML = ``;
  }
}
