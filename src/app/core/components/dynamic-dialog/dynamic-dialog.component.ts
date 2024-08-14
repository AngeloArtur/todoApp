import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewTaskToDoService } from '../../../shared/services/new-task-to-do.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _todo: NewTaskToDoService,
    private _fb: FormBuilder,
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
    } else {
      console.log('inválido');
    }
  }
}
