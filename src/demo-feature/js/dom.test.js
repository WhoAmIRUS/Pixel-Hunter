import jsdom from 'jsdom';

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

/* describe('DOM controller', () => {
  it('Creates empty table', () => {
    const domController = new DomController('#root');

    domController.createTable();

    expect(document.querySelectorAll('table').length).to.equal(1);
  });
});

class DomController {
  constructor(root) {}

  createTable() {}
} */
