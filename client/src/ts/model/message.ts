import { User } from "./user";

export interface Message {
  user: User;
  isYour: boolean;
  text: string;
  date: Date;
  type: MessageType;
}

export enum MessageType {
  JOIN = "JOIN",
  CHAT = "CHAT",
  DISCONNECT = "DISCONNECT",
}
