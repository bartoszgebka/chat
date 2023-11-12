import { Component } from "../../component";

export class HeaderComponent extends Component {
  constructor() {
    super();
    this.style.gridArea = "header-members";
  }

  HTMLTemplate(): string {
    return `
            <header class="header__members">
                <div class="container">
                    <div class="btn-toolbar">
                        <button class="show-members-btn">Pokaż uczestników <span>0</span></button>
                        <button class="disconnect-btn">Rozłącz się</button>
                    </div>
                </div>
            </header>
        `;
  }

  connectedCallback() {
    const btnShowMembersEl: Element = this.querySelector(".show-members-btn");
    const btnDisconnectEl: Element = this.querySelector(".disconnect-btn");

    btnShowMembersEl.addEventListener("click", (e) => {
      e.preventDefault();
      const showMembersEvent = new CustomEvent("showMembers", {
        bubbles: true,
      });
      this.dispatchEvent(showMembersEvent);
    });

    btnDisconnectEl.addEventListener("click", (e) => {
      e.preventDefault();
      const disconnectEvent = new CustomEvent("disconnect", { bubbles: true });
      this.dispatchEvent(disconnectEvent);
    });
  }

  public updateMembersCount(count: number) {
    this.querySelector(".show-members-btn span").innerHTML = count.toString();
  }
}
