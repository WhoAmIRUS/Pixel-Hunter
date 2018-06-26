export function createElement(template, content) {
  const currentBlock = document.querySelector(content);
  currentBlock.innerHTML = template.trim();
  return currentBlock.childNodes[0];
}

export function changeView(view, content = '#block__content') {
  const currentBlock = document.querySelector(content);
  currentBlock.innerHTML = ``;
  currentBlock.appendChild(view.element);
}
