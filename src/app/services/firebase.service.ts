import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ISession } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  getData(session: ISession): Observable<any[]> {
    if (session.roomID) {
      return this.db.list(session.roomID).valueChanges();
    } else {
      return this.db.list('').valueChanges();
    }
  }
}
