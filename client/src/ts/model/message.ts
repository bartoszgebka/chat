import { User } from "./user";

export interface Message {
  user: User;
  date: Date;
  text: string;
}
