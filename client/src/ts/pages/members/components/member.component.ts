import { Component } from "../../component";
import { User } from "../../../model/user";

export class MemberComponent extends Component {
  private user: User;

  constructor() {
    super();
    this.user = <User>JSON.parse(this.getAttribute("member"));
  }

  HTMLTemplate(): string {
    return `
          <li class="member">
            <div class="member__avatar" style="background-color: #7199fe">
              JN
            </div>
            <div class="member__name">Jan Nowak</div>
          </li>
        `;
  }

  connectedCallback() {
    const { name, color } = this.user;

    const memberAvatarEl: HTMLElement = this.querySelector(".member__avatar");
    memberAvatarEl.style.backgroundColor = color;
    memberAvatarEl.textContent = name
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join(" ");

    const memberNameEl: Element = this.querySelector(".member__name");
    memberNameEl.textContent = name;
  }
}
