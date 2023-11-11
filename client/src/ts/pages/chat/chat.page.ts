import { Page } from "../page";
import { State, StateType } from "../../model/state";
import { Message } from "../../model/message";
import { MessagesComponent } from "./components/messages.component";

export class ChatPage extends Page {
  private messagesComponent: MessagesComponent;

  constructor() {
    super(false);
  }

  HTMLTemplate(): string {
    return `
            <div class="chat-grid">
                <header-component></header-component>

      <messages-component>
            <div class="message">
              <div class="message__info">
                <div class="message__author">Jan Nowak</div>
                <div class="message__date">16:45</div>
              </div>
              <div class="message__body">
                <p class="message__text">Cześć!</p>
                <p class="message__text">Co tam?</p>
              </div>
            </div>

            <div class="message message--your">
              <div class="message__info">
                <div class="message__author">Ty</div>
                <div class="message__date">16:47</div>
              </div>
              <div class="message__body">
                <p class="message__text">Cześć!</p>
                <p class="message__text">Wszystko okej :)</p>
              </div>
            </div>
         </messages-component>

      <footer-component></footer-component>
    </div>
        `;
  }

  connectedCallback() {
    this.messagesComponent = <MessagesComponent>(
      this.querySelector("messages-component")
    );

    this.addEventListener("showMembers", () => {
      console.log("Show members!");
    });

    this.addEventListener("disconnect", () => {
      this.mediator.changeState(<State>{ currentPage: StateType.START_PAGE });
    });

    this.addEventListener("sendMessage", (e: CustomEvent<Message>) => {
      this.messagesComponent.addMessage({
        ...e.detail,
        user: this.mediator.getUser(),
      });
    });
  }

  update(state: State) {
    this.setVisible(state.currentPage === StateType.CHAT);
  }
}
