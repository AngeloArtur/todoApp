import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private collectionName: string = '';
  private modalVisibility = new Subject<boolean>();

  modalVisibility$ = this.modalVisibility.asObservable();

  show() {
    this.modalVisibility.next(true);
  }
  
  setCollectionName(name: string) {
    this.collectionName = name;
  }

  getCollectionName(): string {
    return this.collectionName;
  }
}
