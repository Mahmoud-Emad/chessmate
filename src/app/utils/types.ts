export interface inputValidation {
  isValid: boolean;
  errorMessage: string;
}

export interface IMessage {
  id?: string;
  content: string;
  isSystemMessage: boolean;
}

export interface IEvent {
  isMessage: boolean;
  isGameMove: boolean;
  message: IMessage;
  gameMove?: IGameMove;
  user: IUser;
  players: number;
  vistors: number;
}

export interface IUser {
  username: string;
  isPlayer: boolean;
}

export interface ISession {
  user: IUser;
  roomID?: string;
}

export interface IGameMove {}

export interface RoomStore {
  roomID: string;
  user: IUser;
}

export const initialState: RoomStore = {
  roomID: '',
  user: { isPlayer: false, username: '' },
};
