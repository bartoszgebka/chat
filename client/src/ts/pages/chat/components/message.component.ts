import { Component } from "../../component";
import { Message } from "../../../model/message";

export class MessageComponent extends Component {
  messagesAuthorEl: Element;
  messagesDateEl: Element;
  messagesTextEl: Element;
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
    const { user, date, text } = this.message;

    this.messagesAuthorEl = this.querySelector(".message__author");
    this.messagesAuthorEl.innerHTML = user.name;

    this.messagesDateEl = this.querySelector(".message__date");
    this.messagesDateEl.innerHTML = `${date.getHours()}:${date.getMinutes()}`;

    this.messagesTextEl = this.querySelector(".message__text");
    this.messagesTextEl.innerHTML = text;
  }
}
