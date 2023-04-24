export interface inputValidation {
  isValid: boolean;
  errorMessage: string;
}

export interface IMessage {
  content: string;
  isSystemMessage: boolean;
}

export interface HistoryMove {
  move: string;
  piece: string;
  color: string;
  x: boolean;
  check: boolean;
  stalemate: boolean;
}

export interface IEvent {
  roomID?: string;
  id?: string;
  isMessage: boolean;
  isGameMove: boolean;
  message: IMessage;
  gameMove?: IGameMove;
  user: IUser;
  history?: HistoryMove[];
}
export interface IUser {
  username: string;
  isPlayer: boolean;
}

export interface ISession {
  user: IUser;
  roomID?: string;
  reverse: boolean;
  isVistor: boolean;
}

export interface IGameMove {
  move: string;
  piece: string;
  color: string;
  x: boolean;
  check: boolean;
  mate: boolean;
  checkmate: boolean;
  fen: string;
  freeMode: boolean;
  pgn: { pgn: string };
  stalemate: boolean;
}

export interface RoomStore {
  roomID: string;
  user: IUser;
}

export const initialState: RoomStore = {
  roomID: '',
  user: { isPlayer: false, username: '' },
};
