import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { NewTaskToDoService } from '../../shared/services/new-task-to-do.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogComponent } from '../../core/components/dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  date = new Date();
  todoItems: any[] = [];
  inProgressItems: any[] = [];
  doneItems: any[] = [];
  today = new Date();

  lengthTodo!: number;
  lengthInProgress!: number;
  lengthDone!: number;

  constructor(
    private modalService: ModalService,
    private _todo: NewTaskToDoService,
    public dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadTodoItems();
    this.loadInProgressItems();
    this.loadDoneItems();
  }

  openDialog(collection: string) {
    this.modalService.setCollectionName(collection);
    this.modalService.show();
  }

  openTaskDialog(item: any, collection: string) {
    this.dialogService.open(DynamicDialogComponent, {
      data: {
        collection: collection,
        id: item.id, // O ID será corretamente passado aqui
        title: item.title,
        description: item.description,
        date: item.date,
      },
      header: 'Task Details',
    });
  }

  loadTodoItems() {
    this._todo.getTodoItems().subscribe((items) => {
      this.todoItems = items
        .map((item) => {
          let date: Date;

          if (item.date instanceof Date) {
            date = item.date;
          } else if (item.date.seconds) {
            // Firestore Timestamp
            date = new Date(item.date.seconds * 1000);
          } else {
            // Assume que a data é uma string no formato dd/mm/yyyy
            const [day, month, year] = item.date
              .split('/')
              .map((num: string) => parseInt(num, 10));
            date = new Date(year, month - 1, day);
          }
          // Calcular a diferença em dias entre a data da task e a data atual
          const timeDiff = date.getTime() - this.today.getTime();
          const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          // Retorna o item com o id e a data formatada
          return {
            id: item.id, // Inclui o ID aqui
            ...item,
            date: date, // Mantém como Date para ordenação e formatação
            isEmergency: diffInDays <= 7,
          };
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime()); // Ordena pelas datas, mais próximas primeiro
      this.lengthTodo = this.todoItems.length;
    });
  }

  loadInProgressItems() {
    this._todo.getInProgressItems().subscribe((items) => {
      this.inProgressItems = items
        .map((item) => {
          let date: Date;

          if (item.date instanceof Date) {
            date = item.date;
          } else if (item.date.seconds) {
            // Firestore Timestamp
            date = new Date(item.date.seconds * 1000);
          } else {
            // Assume que a data é uma string no formato dd/mm/yyyy
            const [day, month, year] = item.date
              .split('/')
              .map((num: string) => parseInt(num, 10));
            date = new Date(year, month - 1, day);
          }
          // Calcular a diferença em dias entre a data da task e a data atual
          const timeDiff = date.getTime() - this.today.getTime();
          const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          // Retorna o item com o id e a data formatada
          return {
            id: item.id, // Inclui o ID aqui
            ...item,
            date: date, // Mantém como Date para ordenação e formatação
            isEmergency: diffInDays <= 7,
          };
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime()); // Ordena pelas datas, mais próximas primeiro
      this.lengthInProgress = this.inProgressItems.length;
    });
  }

  loadDoneItems() {
    this._todo.getDoneItems().subscribe((items) => {
      this.doneItems = items
        .map((item) => {
          let date: Date;

          if (item.date instanceof Date) {
            date = item.date;
          } else if (item.date.seconds) {
            // Firestore Timestamp
            date = new Date(item.date.seconds * 1000);
          } else {
            // Assume que a data é uma string no formato dd/mm/yyyy
            const [day, month, year] = item.date
              .split('/')
              .map((num: string) => parseInt(num, 10));
            date = new Date(year, month - 1, day);
          }
          // Retorna o item com o id e a data formatada
          return {
            id: item.id, // Inclui o ID aqui
            ...item,
            date: date, // Mantém como Date para ordenação e formatação
          };
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime()); // Ordena pelas datas, mais próximas primeiro
      this.lengthDone = this.doneItems.length;
    });
  }
}
