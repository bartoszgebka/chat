import { Component } from "../../component";
import { Message } from "../../../model/message";

export class MessagesComponent extends Component {
  messagesWrapperEl: Element;
  constructor() {
    super();
  }

  HTMLTemplate(): string {
    return `
            <main class="messages">
                <div class="container">
                    <div class="messages__wrapper">
                    </div>
                </div>
            </main>
        `;
  }

  connectedCallback() {
    this.messagesWrapperEl = this.querySelector(".messages__wrapper");
  }

  public addMessage(message: Message) {
    const markup: string = `
            <message-component message = '${JSON.stringify(
              message,
            )}'></message-component>
        `;
    this.messagesWrapperEl.insertAdjacentHTML("beforeend", markup);
  }
}
