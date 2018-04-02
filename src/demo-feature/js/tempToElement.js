export default function getElementFromTemplate(
  template,
  content = '#block__content',
) {
  const currentBlock = document.querySelector(content);
  currentBlock.innerHTML = template.trim();
  return currentBlock;
}
