import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskState } from '../task-state.enum';

@Component({
  selector: 'tb-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  @Input() task: Task = {
    guid: '',
    text: '',
    title: '',
    state: TaskState.TODO
  };
  @Output() cancel = new EventEmitter<void>();
  @Output() update = new EventEmitter<Task>();

  editTaskForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.editTaskForm = new FormGroup({
      guid: new FormControl(this.task.guid, Validators.required),
      title: new FormControl(this.task.title, Validators.required),
      text: new FormControl(this.task.text),
      state: new FormControl(this.task.state)
    });
  }

  onSubmit() {
    if (this.editTaskForm.valid) {
      this.update.emit(this.editTaskForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
