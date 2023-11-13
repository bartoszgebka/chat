import { State, StateType } from "./model/state";
import { Page } from "./pages/page";
import { User } from "./model/user";
import { WebSocketService } from "./services/web.socket.service";
import { Message } from "./model/message";

class Mediator {
  private state: State = <State>{ currentPage: StateType.START_PAGE };
  private pages: Page[] = [];
  private webSocketService: WebSocketService = new WebSocketService();

  public registerPage(page: Page) {
    this.pages.push(page);
    page.setMediator(this);
  }

  public changeState(state: State) {
    const prevPage = this.state.currentPage;
    this.state = { ...this.state, ...state, previousPage: prevPage };
    this.pages.forEach((p: Page) => p.updateState(this.state));
  }

  public getUser(): User {
    return this.state.user;
  }

  // websocket methods
  public async WSConnect() {
    await this.webSocketService.connect();
    this.state.isConnected = true;
    this.pages.forEach((p) => p.subscribeWebsocketMessages());
  }

  public WSDisconnect() {
    return this.webSocketService.disconnect();
  }

  public WSSubscribeMessages(callback: (message: Message) => void) {
    return this.webSocketService.subscribeMessages(callback);
  }

  public WSSubscribeMembers(callback: (message: User[]) => void) {
    return this.webSocketService.subscribeMembers(callback);
  }

  public WSLoginUser() {
    this.webSocketService.loginUser(this.getUser());
  }

  public WSSendMessage(message: Message) {
    this.webSocketService.sendMessage(message);
  }
}

export const mediator = new Mediator();
