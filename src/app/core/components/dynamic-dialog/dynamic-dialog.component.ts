import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewTaskToDoService } from '../../../shared/services/new-task-to-do.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.css',
})
export class DynamicDialogComponent implements OnInit {
  collectionName!: string;
  taskId!: string;
  form!: FormGroup;
  minDate!: Date;

  isInvalid: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _todo: NewTaskToDoService,
    private _fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.collectionName = this.config.data.collection;
    this.taskId = this.config.data.id;
  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.form = this._fb.group({
      title: [this.config.data.title],
      description: [this.config.data.description],
      date: [this.config.data.date || null],
    });
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this task?',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Task deleted',
          life: 3000,
        });
        this.deleteTask();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
  // Método para deletar a tarefa
  deleteTask() {
    this._todo
      .deleteTask(this.collectionName, this.taskId)
      .then(() => {
        console.log('Task removida com sucesso!');
        this.ref.close();
      })
      .catch((error) => {
        console.error('Erro ao remover a task: ', error);
      });
  }

  updateTask() {
    const data = this.form.value;
    if (this.form.valid) {
      this._todo
        .updateTask(
          this.collectionName,
          this.taskId,
          data.title,
          data.description,
          data.date,
        )
        .then(() => {
          this.ref.close();
        })
        .catch((error) => {
          console.error('Erro ao remover a task: ', error);
        });
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }
}
