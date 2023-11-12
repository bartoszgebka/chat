import { Page } from "../page";
import { State, StateType } from "../../model/state";
import closeSVG from "../../../svg/close.svg";
import { User } from "../../model/user";

export class MembersPage extends Page {
  private membersListEl: Element;

  constructor() {
    super(false);
  }
  HTMLTemplate(): string {
    return `
            <main class="members">
                <div class="container">
                    <img src='${closeSVG}' alt="Zamknij" />
                    <ul class="members__list">
                    </ul>
                </div>
            </main>
        `;
  }

  connectedCallback() {
    this.membersListEl = this.querySelector(".members__list");
    this.registerHandlers();
  }

  private registerHandlers() {
    const img = this.querySelector("img");

    img.addEventListener("click", () => {
      this.mediator.changeState(<State>{ currentPage: StateType.CHAT });
    });
  }

  updateState(state: State) {
    this.setVisible(state.currentPage === StateType.MEMBERS);
  }

  subscribeWebsocketMessages() {
    this.mediator.WSSubscribeMembers((users) => {
      this.membersListEl.innerHTML = users
        .map((user) => this.getMemberMarkup(user))
        .join("");
    });
  }

  private getMemberMarkup(user: User): string {
    return `
            <member-component member = '${JSON.stringify(
              user,
            )}'></member-component>
        `;
  }
}
