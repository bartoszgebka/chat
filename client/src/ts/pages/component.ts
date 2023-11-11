export abstract class Component extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = this.HTMLTemplate();
  }

  abstract HTMLTemplate(): string;
}
