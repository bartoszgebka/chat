import { StartPage } from "./pages/start/start.page";
import { ChatPage } from "./pages/chat/chat.page";
import { Mediator } from "./mediator";
import { HeaderComponent } from "./pages/chat/components/header.component";
import { MessagesComponent } from "./pages/chat/components/messages.component";
import { FooterComponent } from "./pages/chat/components/footer.component";
import { MessageComponent } from "./pages/chat/components/message.component";

// TODO
customElements.define("start-page", StartPage);
customElements.define("chat-page", ChatPage);
customElements.define("header-component", HeaderComponent);
customElements.define("messages-component", MessagesComponent);
customElements.define("message-component", MessageComponent);
customElements.define("footer-component", FooterComponent);

const start: StartPage = <StartPage>document.querySelector("start-page");
const chat: ChatPage = <ChatPage>document.querySelector("chat-page");

const mediator = new Mediator();
mediator.register(start, chat);
