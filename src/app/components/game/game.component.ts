import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AngularFireList,
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ref, getDatabase, set } from 'firebase/database';
import { Chat } from 'src/app/utils/types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  playerName!: string;
  messagesRef!: AngularFireList<any>;
  messages$: Observable<Chat[]>;
  messageValue: string = '';
  MESSAGES: Chat[] = [];

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {
    this.messagesRef = db.list(
      `room/${this.route.snapshot.paramMap.get('roomID')}/`
    );
    this.messages$ = this.messagesRef.valueChanges();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.playerName = params['playerName'];
    });
  }

  sendMessage() {
    const db = getDatabase();
    set(ref(db, `room/${this.route.snapshot.paramMap.get('roomID')}/`), {
      playerName: this.playerName,
      message: this.messageValue,
    });
  }

  // sendMessage() {
  //   const message: Chat = {
  //     message: this.messageValue,
  //     roomID: this.route.snapshot.paramMap.get('roomID')?.toLocaleLowerCase(),
  //     playerName: this.playerName,
  //   };
  //   this.messagesRef.push(message);
  //   this.MESSAGES.push(message);
  //   console.log(this.MESSAGES);
  // }

  getMessages() {
    return this.MESSAGES;
  }
}
