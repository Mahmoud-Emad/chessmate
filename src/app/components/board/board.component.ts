import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgxChessBoardComponent } from 'ngx-chess-board';
import { IEvent, IGameMove, ISession } from 'src/app/utils/types';
import { environment } from './../../utils/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Database,
  getDatabase,
  onValue,
  ref,
  set,
  remove,
} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  app!: FirebaseApp;
  db!: Database;
  events: IEvent[] = [];
  session: ISession = {
    user: { username: '', isPlayer: false },
    roomID: '',
    reverse: false,
    isVistor: false,
  };
  event: IEvent = {
    isMessage: false,
    isGameMove: false,
    user: { username: '', isPlayer: false },
    message: { isSystemMessage: false, content: '' },
    roomID: '',
  };
  constructor(private cdr: ChangeDetectorRef) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
  }

  @ViewChild('board') board!: NgxChessBoardComponent;

  setEventMove(move: IGameMove) {
    // Intialize an event message and setting all required data.
    this.event.isGameMove = true;
    this.event.gameMove = move;
    this.event.id = uuidv4();
    this.event.user = this.session.user;
    this.event.roomID = this.session.roomID;
    return set(
      ref(this.db, `${this.session.roomID}/${this.event.id}`),
      this.event
    );
  }

  isRequestedUser() {
    return this.event.user.username == this.session.user.username
      ? true
      : false;
  }

  onMoveChange(move: any) {
    if (move) {
      const MOVE: IGameMove = move;
      this.setEventMove(MOVE);
    }
  }

  // Method to reverse the board orientation
  reverseBoard(session: ISession) {
    if (session.reverse) {
      setTimeout(() => {
        this.board.lightDisabled = true;
        this.board.reverse();
      });
    } else {
      this.board.darkDisabled = true;
    }
    if (session.isVistor) {
      this.board.lightDisabled = true;
      this.board.darkDisabled = true;
    }
    this.board.size = 650;
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
    let session = localStorage.getItem('session');
    if (session) {
      this.session = JSON.parse(session);
      this.reverseBoard(this.session);
      const messagesRef = ref(this.db, this.session.roomID);

      onValue(messagesRef, (snapshot: any) => {
        const events: IEvent[] = snapshot.val() != null ? snapshot.val() : [];
        for (let id in events) {
          if (events[id].isGameMove) {
            this.event = events[id];
            if (this.event.gameMove) {
              this.board.move(this.event.gameMove.move);
              // remove(ref(this.db, `${this.session.roomID}/${this.event.id}`));
            }
          }
        }
      });
    }
  }
}
