import getElementFromTemplate from './tempToElement';

const screenTemplate = `
<div id="main" class="central__content">
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>
</div>`;

function init(callback) {
  const introElement = getElementFromTemplate(screenTemplate);
  const introAsterisk = introElement.querySelector('.intro__asterisk');
  introAsterisk.addEventListener('click', () => {
    callback();
  });
}

export default init;
