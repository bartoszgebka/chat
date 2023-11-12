import { State, StateType } from "./model/state";
import { Page } from "./pages/page";
import { User } from "./model/user";
import { WebSocketService } from "./web.socket.service";
import { Message } from "./model/message";

export class Mediator {
  private state: State = <State>{ currentPage: StateType.START_PAGE };
  private pages: Page[] = [];
  private webSocketService: WebSocketService = new WebSocketService();

  public registerPages(...pages: Page[]) {
    this.pages = [...pages];
    this.pages.forEach((p) => p.setMediator(this));
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
  public WSConnect() {
    return this.webSocketService.connect();
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
