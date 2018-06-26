import { changeView } from '../tempToElement';
import HeaderView from './header_view';

export default class Header {
  constructor(isFullHeader) {
    this.view = new HeaderView(isFullHeader);
  }
  init() {
    changeView(this.view, this.view.block);
    return this.view.element;
  }
}
