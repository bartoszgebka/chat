import { Client } from "@stomp/stompjs";
import {
  LOGIN_PATH,
  MEMBERS_PATH,
  MESSAGES_PATH,
  SEND_MESSAGE_PATH,
  WS_HOST,
} from "../helper/consts";
import { Message } from "../model/message";
import { User } from "../model/user";

export class WebSocketService {
  private stompClient: Client = new Client({ brokerURL: WS_HOST });

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stompClient.configure({
        onConnect: () => {
          resolve();
        },
        onStompError: (frame) => {
          console.error(`Błąd połączenia`, frame);
          reject("Błąd połączenia z serwerem.");
        },
        onWebSocketError: (e) => {
          console.error(`Błąd połączenia`, e);
          reject("Błąd połączenia z serwerem.");
        },
      });

      this.stompClient.activate();
    });
  }

  public subscribeMessages(callback: (message: Message) => void) {
    this.stompClient.subscribe(MESSAGES_PATH, (iMessage) => {
      callback(<Message>JSON.parse(iMessage.body));
    });
  }

  public subscribeMembers(callback: (users: User[]) => void) {
    this.stompClient.subscribe(MEMBERS_PATH, (iMessage) => {
      callback(<User[]>JSON.parse(iMessage.body));
    });
  }

  public loginUser(user: User) {
    this.stompClient.publish({
      destination: LOGIN_PATH,
      body: JSON.stringify(user),
    });
  }

  public sendMessage(message: Message) {
    this.stompClient.publish({
      destination: SEND_MESSAGE_PATH,
      body: JSON.stringify(message),
    });
  }

  public disconnect() {
    this.stompClient.deactivate();
  }
}
