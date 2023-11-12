import { User } from "./user";

export interface State {
  isConnected: boolean;
  previousPage: StateType;
  currentPage: StateType;
  user: User;
}
export enum StateType {
  START_PAGE,
  CHAT,
  MEMBERS,
}
