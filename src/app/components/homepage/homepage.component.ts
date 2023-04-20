import { Component, OnInit } from '@angular/core';
import { inputValidation } from 'src/app/utils/types';
import { Router } from '@angular/router';
import {
  isValidName,
  isValidRoomID,
  isValidRoomLink,
} from 'src/app/utils/validator';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router) {}

  public isInvitation: boolean = false;
  public isNewGame: boolean = false;
  public roomID!: string;
  public playerName: string = '';

  ngOnInit(): void {}

  generateUUID(): string {
    return uuidv4();
  }

  generateNewRoom() {
    if (!this.playerName || this.playerName.length == 0) {
    }
    this.roomID = this.generateUUID();
    this.router.navigate([`/room/${this.roomID}`], {
      queryParams: { playerName: this.playerName },
    });
  }

  displayJoinRoomInput(): void {
    this.isInvitation = true;
    this.isNewGame = false;
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

  validateGeneratePlayerName(value: string): inputValidation {
    let onValidateRoom: inputValidation = {
      isValid: false,
      errorMessage: '',
    };

    if (isValidName(value, onValidateRoom).isValid) {
      this.playerName = value;
    }
    return onValidateRoom;
  }

  generatePlayerName(): string {
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
    this.playerName = words[index];
    return this.playerName;
  }
}
