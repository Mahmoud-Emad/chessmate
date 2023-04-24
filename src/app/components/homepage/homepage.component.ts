import { Component, OnInit } from '@angular/core';
import { IEvent, ISession, inputValidation } from 'src/app/utils/types';
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
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  public isInvitation: boolean = false;
  public isNewGame: boolean = false;
  public username: string = '';
  public inputValue: string = '';

  ngOnInit(): void {
    window.addEventListener('beforeunload', () => {
      if (this.getSession().user.isPlayer) {
        this.playerLeftRoom();
      }
      this.removeSession();
    });
  }

  playerLeftRoom() {
    alert('Player left the room');
  }

  generateNewRoom() {
    this.removeSession();
    const session: ISession = this.getSession();
    session.user = { username: this.username, isPlayer: true };
    session.roomID = uuidv4();
    session.reverse = false;
    session.isVistor = false;
    if (session.user.username.length) {
      localStorage.setItem('session', JSON.stringify(session));
      this.router.navigate([`/room/${session.roomID}`]);
    }
  }

  displayJoinRoomInput(): void {
    this.isInvitation = true;
    this.isNewGame = false;
    this.removeSession();
    if (this.validateRoomLink(this.inputValue).isValid) {
      const session: ISession = this.getSession();
      session.roomID = this.inputValue;
      // Check if the room has 2 players, in this case vistor mode will be switched.
      let users: string[] = [];
      this.firebaseService.getData(session).subscribe((events: IEvent[]) => {
        events
          .filter((event: IEvent) => event.roomID === this.inputValue)
          .filter((event: IEvent) => users.push(event.user.username));
        users = [...new Set(users)];
        if (users.length >= 2) {
          session.user = { username: generateUsername(), isPlayer: false };
          session.isVistor = true;
          session.reverse = false;
        } else {
          session.user = { username: generateUsername(), isPlayer: true };
          session.isVistor = false;
          session.reverse = true;
        }
        localStorage.setItem('session', JSON.stringify(session));
        if (RGLINK.test(this.inputValue)) {
          this.router.navigate([this.inputValue]);
        } else {
          if (RGUUID.test(this.inputValue)) {
            this.router.navigate([`/room/${this.inputValue}`]);
          }
        }
      });
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
    if (this.getSession()) {
      localStorage.removeItem('session');
    }
  }

  getSession(): ISession {
    let sesstion: ISession = {
      user: { username: '', isPlayer: false },
      roomID: '',
      isVistor: false,
      reverse: false,
    };
    let _sesstion = localStorage.getItem('session');
    if (_sesstion) {
      sesstion = JSON.parse(_sesstion);
    }
    return sesstion;
  }
}
