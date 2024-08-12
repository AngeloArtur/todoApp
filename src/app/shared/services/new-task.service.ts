import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {
  firestoreCollection: AngularFirestoreCollection;
  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('');
  }
}
