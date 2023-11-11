import { Page } from "../page";
import { State, StateType } from "../../model/state";
import { User } from "../../model/user";

export class StartPage extends Page {
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
    const btnEl: Element = this.querySelector(".btn-submit-msg");

    btnEl.addEventListener("click", (e) => {
      e.preventDefault();
      this.login();
    });
  }

  private login() {
    const userName: string = this.querySelector("input").value;
    const errorEl = this.querySelector(".error");

    if (this.validate(userName)) {
      errorEl.textContent = "";
      this.mediator.changeState({
        currentPage: StateType.CHAT,
        user: <User>{ name: userName },
      });
    } else {
      errorEl.textContent = "Pole wymagane";
    }
  }

  private validate(login: string) {
    return !!login && login !== "";
  }

  update(state: State) {
    this.setVisible(state.currentPage === StateType.START_PAGE);
  }
}
