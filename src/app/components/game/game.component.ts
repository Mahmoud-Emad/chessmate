import { environment } from './../../utils/environment';
import { Component, OnInit } from '@angular/core';
import { getDatabase, Database, set, ref, onValue } from 'firebase/database';
import { IEvent, ISession, IUser } from 'src/app/utils/types';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { generateUsername } from 'src/app/utils/helpers';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  app!: FirebaseApp;
  db!: Database;
  form!: FormGroup;
  events: IEvent[] = [];
  message?: string;
  session!: ISession;
  user: IUser = { username: '', isPlayer: false };
  event: IEvent = {
    isMessage: false,
    isGameMove: false,
    user: { username: '', isPlayer: false },
    message: { isSystemMessage: false, content: '' },
    roomID: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const session = localStorage.getItem('session');
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    if (session) {
      this.session = JSON.parse(session);
      this.form = this.formBuilder.group({ messageContent: '' });
    } else {
      // Return the user back to the home page.
      const roomID = this.route.snapshot.paramMap.get('roomID');
      if (roomID) {
        this.session = {
          user: { username: generateUsername(), isPlayer: false },
          isVistor: true,
          reverse: false,
          roomID: roomID,
        };
        localStorage.setItem('session', JSON.stringify(this.session));
      } else {
        this.router.navigate([`/`]);
      }
    }
  }

  onMessageSubmit(form: { messageContent: string }) {
    if (this.session) {
      this.event.message.content = form.messageContent;
      this.event.id = uuidv4();
      this.event.isMessage = true;
      this.event.user = this.session.user;
      this.event.roomID = this.session.roomID;
      set(ref(this.db, `${this.session.roomID}/${this.event.id}`), this.event);
      this.form = this.formBuilder.group({ messageContent: '' });
    }
  }

  newJoinedUser(session: ISession): IEvent {
    return {
      id: uuidv4(),
      message: {
        content: 'has been joined!',
        isSystemMessage: true,
      },
      isMessage: true,
      isGameMove: false,
      user: session.user,
      roomID: session.roomID,
    };
  }
  ngOnInit(): void {
    if (this.session) {
      const roomID = this.route.snapshot.paramMap.get('roomID');
      if (roomID && this.session.roomID != roomID) {
        this.session.roomID = roomID;
        // Return user back to enter using the join room button to update the sesstion.
        this.router.navigate([`/`]);
      }
      const messagesRef = ref(this.db, this.session.roomID);
      this.onJoinUser(this.session);
      onValue(messagesRef, (snapshot: any) => {
        this.scroll();
        const events = snapshot.val() != null ? snapshot.val() : [];
        for (let id in events) {
          if (!this.events.map((event) => event.id).includes(id)) {
            this.events.push(events[id]);
          }
        }
      });
    }
  }
  scroll() {
    const chatBox = document.querySelector('.message-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
  onJoinUser(session: ISession) {
    if (session.roomID) {
      const newJoinedEvent = this.newJoinedUser(session);
      set(
        ref(this.db, `${session.roomID}/${newJoinedEvent.id}`),
        newJoinedEvent
      );
    }
  }
}
