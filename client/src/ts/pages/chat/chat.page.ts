import { Page } from "../page";
import { State, StateType } from "../../model/state";
import { Message } from "../../model/message";
import { MessagesComponent } from "./components/messages.component";
import { HeaderComponent } from "./components/header.component";
import {FooterComponent} from "./components/footer.component";

export class ChatPage extends Page {
  private headerComponent: HeaderComponent;
  private messagesComponent: MessagesComponent;
  private footerComponent: FooterComponent;

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
    this.headerComponent = <HeaderComponent>(
      this.querySelector("header-component")
    );
    this.messagesComponent = <MessagesComponent>(
      this.querySelector("messages-component")
    );
    this.footerComponent = <FooterComponent>(
        this.querySelector("footer-component")
    );

    this.registerHandlers();
  }

  private registerHandlers() {
    this.addEventListener("showMembers", () => {
      this.mediator.changeState(<State>{ currentPage: StateType.MEMBERS });
    });

    this.addEventListener("disconnect", () => {
      this.messagesComponent.clear();
      this.mediator.WSDisconnect();
      this.mediator.changeState(<State>{ currentPage: StateType.START_PAGE });
    });

    this.addEventListener("sendMessage", (e: CustomEvent<Message>) => {
      const message: Message = { ...e.detail, user: this.mediator.getUser() };
      this.mediator.WSSendMessage(message);
    });
  }

  updateState(state: State) {
    if (state.currentPage === StateType.CHAT) {
      this.setVisible(true);

      // login successful
      if (state.isConnected && state.previousPage === StateType.START_PAGE) {
        this.mediator.WSLoginUser();
        this.footerComponent.focusInput();
      }
    } else {
      this.setVisible(false);
    }
  }

  subscribeWebsocketMessages() {
    this.mediator.WSSubscribeMessages((message) => {
      message.isYour = this.mediator.getUser().uuid === message.user.uuid;
      this.messagesComponent.addMessage(message);
    });

    this.mediator.WSSubscribeMembers((users) => {
      this.headerComponent.updateMembersCount(users.length);
    });
  }
}
