import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskState } from '../task-state.enum';
import { Task } from '../task.model';

@Component({
  selector: 'tb-task-quick-add',
  templateUrl: './task-quick-add.component.html',
  styleUrls: ['./task-quick-add.component.scss']
})
export class TaskQuickAddComponent implements OnInit {
  @Output() addTask = new EventEmitter<Task>();

  addTaskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('')
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.addTaskForm.valid) {
      this.addTask.emit({
        guid: '',
        text: this.addTaskForm.value.text,
        title: this.addTaskForm.value.title,
        state: TaskState.TODO
      });
      this.addTaskForm.reset();
    }
  }
}
