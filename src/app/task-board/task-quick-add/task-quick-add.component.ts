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
    summary: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      this.addTask.emit({
        id: '',
        description: this.addTaskForm.value.description,
        summary: this.addTaskForm.value.summary,
        state: TaskState.TODO
      });
      this.addTaskForm.reset();
    }
  }
}
