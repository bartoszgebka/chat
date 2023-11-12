import { Component } from "../../component";
import submitSVG from "../../../../svg/submit.svg";
import { Message, MessageType } from "../../../model/message";

export class FooterComponent extends Component {
  private inputEl : HTMLInputElement;
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
    const formEl = this.querySelector("form");
    this.inputEl = formEl.querySelector("input");

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmitMessage();
    });
  }

  private handleSubmitMessage() {
    if (this.inputEl.value) {
      const sendMessageEvent = new CustomEvent<Message>("sendMessage", {
        bubbles: true,
        detail: <Message>{
          text: this.inputEl.value,
          date: new Date(),
          type: MessageType.CHAT,
        },
      });
      this.dispatchEvent(sendMessageEvent);
      this.inputEl.value = null;
    }
  }

  public focusInput() {
    this.inputEl.focus();
  }
}
