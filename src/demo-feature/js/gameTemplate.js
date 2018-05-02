import _ from '../../../node_modules/lodash';
import statsTemplate from './statsTemplate';
import resultStats from './resultStats';

export default data => {
  const template = _.template(`
<div class="game">
<p class="game__task">${data.task}</p>
<form class="game__content <% if (data.type == 'tinder-like') { %> game__content--wide <% } %>
                           <% if (data.type == 'one-of-three') { %> game__content--triple <% } %>">
<% for(let i = 1; i<=data.items.length; i++){ %>
  <div class="game__option">
    <img src="<%=data.items[i-1].image.url%>" alt="Option <%=i%>" width="<%=data.items[i-1].width%>" 
                                                              height="<%=data.items[i-1].height%>">
    <% if (data.type !== 'one-of-three') {%>
    <label class="game__answer game__answer--photo">
      <input name="question<%=i%>" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer <% if (data.type == 'tinder-like') { %> game__answer--wide <% } %> game__answer--paint">
      <input name="question<%=i%>" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
    <% } %>
  </div>
<% } %>
</form>
<div class="stats">
  ${statsTemplate(resultStats)}
</div>
</div>`)({ data });
  return template;
};
