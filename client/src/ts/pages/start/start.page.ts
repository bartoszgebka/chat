import { Page } from "../page";
import { State, StateType } from "../../model/state";
import { Helpers } from "../../helper/helpers";
import { v4 as uuidv4 } from "uuid";

export class StartPage extends Page {
  private errorEl: Element;
  constructor() {
    super(true);
  }

  HTMLTemplate(): string {
    return `
            <div class="start-page container">
                <form>
                    <input type="text" placeholder="Login" />
                    <div class="error"></div>
                    <button type="submit" class="btn-submit-msg">Wejdź</button>
                </form>
            </div>
        `;
  }

  connectedCallback() {
    this.errorEl = this.querySelector(".error");
    const formEl: Element = this.querySelector("form");

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.login();
    });
  }

  private login() {
    const username: string = this.querySelector("input").value;

    if (this.isEmptyLogin(username)) {
      this.errorEl.textContent = "Pole wymagane";
    } else {
      this.connectAndChangePage(username);
    }
  }

  private async connectAndChangePage(username: string) {
    try {
      await this.mediator.WSConnect();
      const newState = <State>{
        currentPage: StateType.CHAT,
        user: {
          name: username,
          color: Helpers.generateRandomColor(),
          uuid: uuidv4(),
        },
      };
      this.mediator.changeState(newState);
    } catch (e) {
      this.errorEl.innerHTML = e;
    }
  }

  private isEmptyLogin(login: string) {
    return !login || login.trim() === "";
  }

  updateState(state: State) {
    this.setVisible(state.currentPage === StateType.START_PAGE);
  }
}
