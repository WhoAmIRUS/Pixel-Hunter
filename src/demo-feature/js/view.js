import { createElement } from './tempToElement';

export default class AbstractView {
  constructor(content = '#block__content') {
    this.template = new Error('No template');
    this.block = content;
  }
  render() {
    return createElement(this.template, this.block);
  }
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
