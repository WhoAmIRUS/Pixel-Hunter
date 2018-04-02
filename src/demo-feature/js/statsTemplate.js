export default data => `
<ul class="stats">
  ${new Array(data.wrong)
    .fill('<li class="stats__result stats__result--wrong"></li>')
    .join(``)}
  ${new Array(data.slow)
    .fill('<li class="stats__result stats__result--slow"></li>')
    .join(``)}
  ${new Array(data.fast)
    .fill('<li class="stats__result stats__result--fast"></li>')
    .join(``)}
  ${new Array(data.correct)
    .fill('<li class="stats__result stats__result--correct"></li>')
    .join(``)}
  ${new Array(10 - data.wrong - data.slow - data.fast - data.correct)
    .fill('<li class="stats__result stats__result--unknown"></li>')
    .join(``)}
</ul>`;
