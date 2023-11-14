import { State } from "../model/state";
import { mediator } from "../mediator";

export abstract class Page extends HTMLElement {
  protected mediator = mediator;

  protected constructor(visible: boolean) {
    super();
    this.setVisible(visible);
    this.style.height = "100%";
    this.innerHTML = this.HTMLTemplate();
  }

  protected setVisible(visible: boolean) {
    this.style.display = visible ? "block" : "none";
  }

  abstract HTMLTemplate(): string;

  abstract updateState(state: State): void;

  subscribeWebsocketMessages() {}
}
