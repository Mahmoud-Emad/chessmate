import { environment } from './../../utils/environment';
import { Component, OnInit } from '@angular/core';
import {
  getDatabase,
  Database,
  set,
  ref,
  onValue,
  onChildAdded,
} from 'firebase/database';
import { IEvent, IMessage, ISession } from 'src/app/utils/types';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  app!: FirebaseApp;
  db!: Database;
  form!: FormGroup;
  messages: IMessage[] = [];
  message?: string;
  session: string | null;
  event: IEvent = {
    isMessage: false,
    isGameMove: false,
    user: { username: '', isPlayer: false },
    message: { isSystemMessage: false, content: '' },
    players: 0,
    vistors: 0,
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.session = localStorage.getItem('session');
    if (this.session) {
      this.app = initializeApp(environment.firebase);
      this.db = getDatabase(this.app);
      this.form = this.formBuilder.group({ messageContent: '' });
    } else {
      // Return the user back to the home page.
      this.router.navigate([`/`]);
    }
  }

  onMessageSubmit(form: { messageContent: string }) {
    if (this.session) {
      const session: ISession = JSON.parse(this.session);
      this.event.message.content = form.messageContent;
      this.event.message.id = uuidv4();
      this.event.isMessage = true;
      this.event.user = session.user;
      if (this.event.user.isPlayer) {
        this.event.players += 1;
      } else {
        this.event.vistors += 1;
      }
      set(
        ref(this.db, `${session.roomID}/${this.event.message.id}`),
        this.event
      );
      this.form = this.formBuilder.group({ messageContent: '' });
    }
  }

  ngOnInit(): void {
    // if (this.roomID) {
    //   const messagesRef = ref(this.db, this.roomID);
    //   onValue(messagesRef, (snapshot: any) => {
    //     const data = snapshot.val() != null ? snapshot.val() : [];
    //     for (let id in data) {
    //       if (!this.messages.map((message) => message.id).includes(id)) {
    //         this.messages.push(data[id]);
    //       }
    //     }
    //   });
    // }
  }

  setSysMessage() {}
}
