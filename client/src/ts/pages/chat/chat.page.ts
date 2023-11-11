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

            <messages-component></messages-component>

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
      this.messagesComponent.clear();
      this.mediator.changeState(<State>{ currentPage: StateType.START_PAGE });
    });

    this.addEventListener("sendMessage", (e: CustomEvent<Message>) => {
      const message: Message = { ...e.detail, user: this.mediator.getUser() };

      this.messagesComponent.addMessage(message);
    });
  }

  update(state: State) {
    this.setVisible(state.currentPage === StateType.CHAT);
  }
}
