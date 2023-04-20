export interface inputValidation {
  isValid: boolean;
  errorMessage: string;
}

export interface Chat {
  roomID?: string;
  playerName?: string;
  message?: string;
}
