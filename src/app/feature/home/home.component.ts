import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  date = new Date();

  constructor(private modalService: ModalService) {}

  openDialog(collection: string) {
    this.modalService.setCollectionName(collection)
    this.modalService.show();
  }
}
