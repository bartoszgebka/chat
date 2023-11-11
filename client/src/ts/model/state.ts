import { User } from "./user";

export interface State {
  currentPage: StateType;
  user: User;
}
export enum StateType {
  START_PAGE,
  CHAT,
  MEMBERS,
}
