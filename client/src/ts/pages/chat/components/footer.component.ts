import { Component } from "../../component";
import submitSVG from "../../../../svg/submit.svg";
import { Message } from "../../../model/message";

export class FooterComponent extends Component {
  constructor() {
    super();
  }

  HTMLTemplate(): string {
    return `
            <footer class="footer__submit">
                <div class="submit__wrapper">
                    <input type="text" placeholder="Twoja wiadomość..." />
                    <button type="submit" class="btn-submit-msg">
                        <img src='${submitSVG}' alt="Wyślij" />
                    </button>
                </div>
            </footer>
        `;
  }

  connectedCallback() {
    const btnSendMessageEl: Element = this.querySelector(".btn-submit-msg");
    const inputEL = this.querySelector("input");

    btnSendMessageEl.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleSubmitMessage(inputEL);
    });

    inputEL.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.handleSubmitMessage(inputEL);
      }
    });
  }

  private handleSubmitMessage(inputEl: HTMLInputElement) {
    if (inputEl.value) {
      const sendMessageEvent = new CustomEvent<Message>("sendMessage", {
        bubbles: true,
        detail: <Message>{
          text: inputEl.value,
          date: new Date(),
        },
      });
      this.dispatchEvent(sendMessageEvent);
      inputEl.value = null;
    }
  }
}
