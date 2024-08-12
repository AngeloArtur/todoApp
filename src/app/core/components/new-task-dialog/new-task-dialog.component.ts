import { Component } from '@angular/core';
import { ModalService } from '../../../shared/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrl: './new-task-dialog.component.css',
})
export class NewTaskDialogComponent {
  public visible: boolean = false;
  public collectionName!: string;
  public form: FormGroup;

  constructor(
    private modalService: ModalService,
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.modalService.modalVisibility$.subscribe((visible) => {
      this.visible = visible;
    });
  }

  newTask() {
    this.collectionName = this.modalService.getCollectionName();
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('formData', formData, '\ncollectionName', this.collectionName);
    } else {
      console.log('invalid', '\ncollectionName', this.collectionName);
    }

  }
}
