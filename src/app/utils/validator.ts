import { inputValidation } from './types';

export const RGLINK: RegExp =
  /[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/i;
export const RGUUID: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isValidRoomID = (
  value: string,
  validated: inputValidation
): inputValidation => {
  // Check if the incoming value is valid room uuid or valid room link;
  if (!RGUUID.test(value)) {
    validated.isValid = false;
    validated.errorMessage =
      'Please Make Sure That You Entered a Valid Link/Room ID.';
    return validated;
  } else {
    validated.isValid = true;
    validated.errorMessage = '';
    return validated;
  }
};

export const isValidRoomLink = (
  value: string,
  validated: inputValidation
): inputValidation => {
  // Check if the incoming value is valid room uuid or valid room link;
  if (!RGLINK.test(value)) {
    validated.isValid = false;
    validated.errorMessage =
      'Please Make Sure That You Entered a Valid Link/Room ID.';
    return validated;
  } else {
    validated.isValid = true;
    validated.errorMessage = '';
  }

  return validated;
};

export const isValidName = (value: string, validated: inputValidation) => {
  if (!value) {
    validated.isValid = false;
    validated.errorMessage = 'Please enter a valid Name.';
  } else if (value && value.length < 4) {
    validated.isValid = false;
    validated.errorMessage =
      'The player name should be more than 4 letters, try to click on the ` generate a random name ` button to generate one.';
  } else {
    validated.isValid = true;
    validated.errorMessage = '';
  }
  return validated;
};
