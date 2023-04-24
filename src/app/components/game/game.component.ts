import { environment } from './../../utils/environment';
import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  getDatabase,
  Database,
  set,
  ref,
  onValue,
  remove,
} from 'firebase/database';
import { IEvent, ISession, IUser } from 'src/app/utils/types';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
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
  vistors: Array<String> = [];
  @Output() playerLeft = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({ messageContent: '' });
    const session = localStorage.getItem('session');
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    if (session) {
      this.session = JSON.parse(session);
    } else {
      // Return the user back to the home page.
      this.router.navigate([`/`]);
    }
  }

  ngOnDestroy(): void {
    this.playerLeftRoom(this.session);
  }

  getVistors(session: ISession) {
    let vistors: string[] = [];
    this.events
      .filter((event: IEvent) => event.roomID === session.roomID)
      .filter((event: IEvent) => {
        if (!event.user.isPlayer) {
          vistors.push(event.user.username);
        }
      });
    this.vistors = vistors = [...new Set(vistors)];
  }

  onMessageSubmit(form: { messageContent: string }) {
    if (this.session && form && form.messageContent) {
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
    this.getVistors(session);
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
  playerLeftRoom(session: ISession): IEvent {
    if (session && session.user) {
      this.event = {
        id: uuidv4(),
        message: {
          content: 'left the room!',
          isSystemMessage: true,
        },
        isMessage: true,
        isGameMove: false,
        user: session.user,
        roomID: session.roomID,
      };
      // Remove all game history.
      const history = [
        ...new Set(this.events.filter((event) => event.isGameMove)),
      ];
      for (let id in history) {
        remove(ref(this.db, `${this.session.roomID}/${history[id].id}`));
      }
      set(ref(this.db, `${session.roomID}/${this.event.id}`), this.event);
      this.events = this.events.filter((event) => event.isGameMove != true);
      this.playerLeft.emit('playerLeft');
    }
    return this.event;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    if (this.session) {
      this.playerLeftRoom(this.session);
    }
  }

  ngOnInit(): void {
    this.playerLeft.emit('playerLeft');
    console.log('Player left ');
    ('playerLeft');
    if (this.session) {
      const messagesRef = ref(this.db, this.session.roomID);
      const roomID = this.route.snapshot.paramMap.get('roomID');
      if (roomID && this.session.roomID != roomID) {
        this.session.roomID = roomID;
        // Return user back to enter using the join room button to update the sesstion.
        this.router.navigate([`/`]);
      }
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
