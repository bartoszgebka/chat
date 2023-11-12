import { State } from "../model/state";
import { Mediator } from "../mediator";

export abstract class Page extends HTMLElement {
  protected mediator: Mediator;

  constructor(visible: boolean) {
    super();
    this.setVisible(visible);
    this.style.height = "100%";
    this.innerHTML = this.HTMLTemplate();
  }

  public setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }

  protected setVisible(visible: boolean) {
    this.style.display = visible ? "block" : "none";
  }

  abstract HTMLTemplate(): string;

  abstract updateState(state: State);

  subscribeWebsocketMessages() {}
}
