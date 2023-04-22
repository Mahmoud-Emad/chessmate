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
import { FormGroup } from '@angular/forms';

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

  ngOnInit(): void {}

  generateUUID(): string {
    return uuidv4();
  }

  generateNewRoom() {
    const session: ISession = {
      user: { username: this.username, isPlayer: true },
      roomID: uuidv4(),
    };
    localStorage.setItem('session', JSON.stringify(session));
    this.router.navigate([`/room/${session.roomID}`]);
  }

  displayJoinRoomInput(): void {
    this.isInvitation = true;
    this.isNewGame = false;
    if (this.validateRoomLink(this.inputValue).isValid) {
      const session: ISession = {
        user: { username: this.username, isPlayer: true },
        roomID: this.inputValue,
      };
      localStorage.setItem('session', JSON.stringify(session));
      if (RGLINK.test(this.inputValue)) {
        this.router.navigate([this.inputValue]);
        // Link Case.
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
    const words = [
      'Galaxy',
      'Nebula',
      'Cosmos',
      'Star',
      'Planet',
      'Asteroid',
      'Comet',
      'Meteor',
      'Gravity',
      'Orbit',
    ];
    const index = Math.floor(Math.random() * words.length);
    this.username = words[index];
    return this.username;
  }
}
