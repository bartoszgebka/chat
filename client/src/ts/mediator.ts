import { State, StateType } from "./model/state";
import { Page } from "./pages/page";
import { User } from "./model/user";

export class Mediator {
  private state: State = <State>{ currentPage: StateType.START_PAGE };
  private pages: Page[] = [];

  public register(...pages: Page[]) {
    this.pages = [...pages];
    this.pages.forEach((p) => p.setMediator(this));
  }

  public changeState(state: State) {
    this.state = { ...this.state, ...state };
    this.pages.forEach((p: Page) => p.update(this.state));
  }

  public getUser(): User {
    return this.state.user;
  }
}
