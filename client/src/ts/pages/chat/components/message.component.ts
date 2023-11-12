import { Component } from "../../component";
import { Message, MessageType } from "../../../model/message";

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
              <div class="message__info">
                <div class="message__author"></div>
                <div class="message__date"></div>
              </div>
              <div class="message__body">
                <p class="message__text"></p>
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

    const messagesAuthorEl = this.querySelector(".message__author");
    messagesAuthorEl.innerHTML = user.name;

    const messagesDateEl = this.querySelector(".message__date");
    messagesDateEl.innerHTML = `${date.getHours()}:${date.getMinutes()}`;

    const messagesTextEl = this.querySelector(".message__text");
    messagesTextEl.innerHTML = text;
  }
}
