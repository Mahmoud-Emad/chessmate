import { Component, OnInit } from '@angular/core';
import { ISession, inputValidation } from 'src/app/utils/types';
import { Router } from '@angular/router';
import {
  RGLINK,
  RGUUID,
  isValidName,
  isValidRoomID,
  isValidRoomLink,
} from 'src/app/utils/validator';
import { v4 as uuidv4 } from 'uuid';
import { generateUsername } from 'src/app/utils/helpers';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router) {}

  public isInvitation: boolean = false;
  public isNewGame: boolean = false;
  public username: string = '';
  public inputValue: string = '';

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      this.removeSession();
    });
  }

  generateNewRoom() {
    this.removeSession();
    const session: ISession = {
      user: { username: this.username, isPlayer: true },
      roomID: uuidv4(),
      reverse: false,
      isVistor: false,
    };
    localStorage.setItem('session', JSON.stringify(session));
    this.router.navigate([`/room/${session.roomID}`]);
  }

  displayJoinRoomInput(): void {
    this.isInvitation = true;
    this.isNewGame = false;
    this.removeSession();
    if (this.validateRoomLink(this.inputValue).isValid) {
      const session: ISession = {
        user: { username: generateUsername(), isPlayer: false },
        roomID: this.inputValue,
        reverse: true,
        isVistor: false,
      };
      localStorage.setItem('session', JSON.stringify(session));
      if (RGLINK.test(this.inputValue)) {
        // Link Case.
        this.router.navigate([this.inputValue]);
      } else {
        if (RGUUID.test(this.inputValue)) {
          this.router.navigate([`/room/${this.inputValue}`]);
        }
      }
    }
  }

  displayNewRoomInput(): void {
    this.isNewGame = true;
    this.isInvitation = false;
  }

  validateRoomLink(value: string): inputValidation {
    let onValidateRoom: inputValidation = {
      isValid: false,
      errorMessage: '',
    };
    if (isValidRoomID(value, onValidateRoom).isValid) {
      return onValidateRoom;
    } else {
      isValidRoomLink(value, onValidateRoom);
      return onValidateRoom;
    }
  }

  validateGenerateusername(value: string): inputValidation {
    let onValidateRoom: inputValidation = {
      isValid: false,
      errorMessage: '',
    };

    if (isValidName(value, onValidateRoom).isValid) {
      this.username = value;
    }
    return onValidateRoom;
  }

  generateusername(): string {
    this.username = generateUsername();
    return this.username;
  }

  removeSession() {
    if (localStorage.getItem('session')) {
      localStorage.removeItem('session');
    }
  }
}
