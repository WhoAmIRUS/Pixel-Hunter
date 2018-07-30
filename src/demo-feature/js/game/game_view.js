import _ from '../../../../node_modules/lodash';
import statsTemplate from '../statsTemplate';
import AbstractView from '../view';
import resultStats from '../resultStats';

export default class GameView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
    this.template = _.template(`
    <div class="game">
    <p class="game__task">${data.question}</p>
    <form class="game__content <% if (data.type == 'tinder-like') { %> game__content--wide <% } %>
                               <% if (data.type == 'one-of-three') { %> game__content--triple <% } %>">
    <% for(let i = 1; i<=data.answers.length; i++){ %>
      <div class="game__option">
        <img src="<%=data.answers[i-1].image.url%>" alt="Option <%=i%>" width="<%=data.answers[i-1].image.width%>">
        <% if (data.type !== 'one-of-three') {%>
        <label class="game__answer game__answer--photo">
          <input name="question<%=i%>" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer <% if (data.type == 'tinder-like') { %> game__answer--wide <% } %> game__answer--paint">
          <input name="question<%=i%>" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
        <% } %>
      </div>
    <% } %>
    </form>
    <div class="stats">
      ${statsTemplate(resultStats)}
    </div>
    </div>`)({ data: this.data });
  }
  bind() {
    this.gameAnswer = this.element.querySelectorAll('.game__answer');
    this.gameOption = this.element.querySelectorAll('.game__option');
    switch (this.data.type) {
      case 'two-of-two':
        this.gameAnswer.forEach(item => {
          item.addEventListener('change', () => {
            const gameCheckedElements = this.element.querySelectorAll(
              'input:checked',
            );
            if (gameCheckedElements.length === this.data.answers.length) {
              for (let i = 0; i < gameCheckedElements.length; i += 1) {
                if (
                  this.data.answers[i].type !== gameCheckedElements[i].value
                ) {
                  this.onAnswer(`wrong`);
                  return;
                }
              }
              this.onAnswer(`correct`);
            }
          });
        });
        break;
      case 'tinder-like':
        this.gameAnswer.forEach(item => {
          item.addEventListener('change', () => {
            const gameCheckedElement = this.element.querySelector(
              'input:checked',
            );
            if (item.querySelector('input').checked) {
              if (this.data.answers[0].type !== gameCheckedElement.value) {
                this.onAnswer(`wrong`);
              } else {
                this.onAnswer(`correct`);
              }
            }
          });
        });
        break;
      case 'one-of-three':
        this.oneOfThree();
        break;
      default:
        throw new Error(
          'next type of game in array not equal saved types of games',
        );
    }
  }
  oneOfThree() {
    let correctAnswer;
    this.data.answers.some((item, itemIndex) => {
      for (let i = 0; i < this.data.answers.length; i++) {
        if (item.type === this.data.answers[i].type && itemIndex !== i) {
          correctAnswer = ``;
          break;
        } else {
          correctAnswer = item.type;
        }
      }
      if (correctAnswer) return true;
      return false;
    });
    this.gameOption.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (this.data.answers[index].type !== correctAnswer) {
          this.onAnswer(`wrong`);
        } else {
          this.onAnswer(`correct`);
        }
      });
    });
  }
}
