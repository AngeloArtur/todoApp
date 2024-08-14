import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewTaskToDoService {
  firestoreCollection!: AngularFirestoreCollection;
  constructor(private firestore: AngularFirestore) {}

  setCollectionName(collectionName: string) {
    this.firestoreCollection = this.firestore.collection(collectionName);
  }

  addTodo(title: string, description: string, date: Date) {
    const formattedDate = this.formatDateToDDMMYYYY(date);
    if (this.firestoreCollection) {
      const docRef = this.firestoreCollection.add({
        title,
        description,
        date: formattedDate,
      });
    } else {
      console.error('Collection not set');
    }
  }
  updateTask(
    collection: string,
    taskId: string,
    title: string,
    description: string,
    date: Date,
  ): Promise<void> {
    const formattedDate = this.formatDateToDDMMYYYY(date);
    if (collection) {
      return this.firestore
        .collection(collection)
        .doc(taskId)
        .update({ title, description, date: formattedDate });
    } else {
      return Promise.reject('Collection not found.');
    }
  }
  deleteTask(collection: string, taskId: string): Promise<void> {
    if (taskId) {
      return this.firestore.collection(collection).doc(taskId).delete();
    } else {
      return Promise.reject('Task ID not found.');
    }
  }

  getTodoItems(): Observable<any[]> {
    return this.firestore
      .collection('to-do')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id; // Aqui você obtém o ID do documento
            return { id, ...data };
          }),
        ),
      );
  }

  getInProgressItems(): Observable<any[]> {
    return this.firestore
      .collection('in-progress')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id; // Aqui você obtém o ID do documento
            return { id, ...data };
          }),
        ),
      );
  }

  getDoneItems(): Observable<any[]> {
    return this.firestore
      .collection('done')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id; // Aqui você obtém o ID do documento
            return { id, ...data };
          }),
        ),
      );
  }

  formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
