import { Component } from "../../component";
import { Message, MessageType } from "../../../model/message";
import { Helpers } from "../../../helper/helpers";
import { WebComponent } from "../../../helper/web.component.decorator";

@WebComponent("message-component")
export class MessageComponent extends Component {
  message: Message;

  constructor() {
    super();
    this.message = <Message>JSON.parse(this.getAttribute("message"));
    this.message.date = new Date(this.message.date.toString());
  }

  HTMLTemplate(): string {
    return `
            <div class="message">
              <div class="user-avatar"></div>
              <div style="flex-grow: 1;">
                  <div class="message__info">
                      <div class="message__author"></div>
                      <div class="message__date"></div>
                  </div>
                  <div class="message__body">
                      <p class="message__text"></p>
                  </div>
              </div>
            </div>
        `;
  }

  connectedCallback() {
    const { user, date, text, isYour, type } = this.message;

    const messageEl = this.querySelector(".message");

    if (isYour) {
      messageEl.classList.add("message--your");
    }

    if ([MessageType.JOIN, MessageType.DISCONNECT].includes(type)) {
      messageEl.classList.add(`message--${type.toLowerCase()}`);
    }

    const userAvatarEl: HTMLElement = this.querySelector(".user-avatar");
    userAvatarEl.style.backgroundColor = user.color;
    userAvatarEl.textContent = Helpers.getUserShortName(user.name);

    const messagesAuthorEl = this.querySelector(".message__author");
    messagesAuthorEl.textContent = user.name;

    const messagesDateEl = this.querySelector(".message__date");
    messagesDateEl.textContent = `${date.getHours()}:${date.getMinutes()}`;

    const messagesTextEl = this.querySelector(".message__text");
    messagesTextEl.textContent = text;
  }
}
