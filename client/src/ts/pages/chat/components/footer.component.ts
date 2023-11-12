import { Component } from "../../component";
import submitSVG from "../../../../svg/submit.svg";
import { Message, MessageType } from "../../../model/message";

export class FooterComponent extends Component {
  constructor() {
    super();
    this.style.gridArea = "footer-submit";
  }

  HTMLTemplate(): string {
    return `
            <footer class="footer__submit">
                <form class="submit__wrapper">
                    <input type="text" placeholder="Twoja wiadomość..." />
                    <button type="submit" class="btn-submit-msg">
                        <img src='${submitSVG}' alt="Wyślij" />
                    </button>
                </form>
            </footer>
        `;
  }

  connectedCallback() {
    const inputEl = this.querySelector("input");
    const formEl = this.querySelector("form");

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmitMessage(inputEl);
    });
  }

  private handleSubmitMessage(inputEl: HTMLInputElement) {
    if (inputEl.value) {
      const sendMessageEvent = new CustomEvent<Message>("sendMessage", {
        bubbles: true,
        detail: <Message>{
          text: inputEl.value,
          date: new Date(),
          type: MessageType.CHAT,
        },
      });
      this.dispatchEvent(sendMessageEvent);
      inputEl.value = null;
    }
  }
}
