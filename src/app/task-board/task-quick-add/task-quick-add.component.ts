import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TaskState } from '../task-state.enum';

@Component({
  selector: 'tb-task-quick-add',
  templateUrl: './task-quick-add.component.html',
  styleUrls: ['./task-quick-add.component.scss']
})
export class TaskQuickAddComponent implements OnInit {
  addTaskForm = new FormGroup({
    summary: new FormControl('wtf', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      this.tasksService.createTask({
        id: null,
        description: this.addTaskForm.value.description,
        summary: this.addTaskForm.value.summary,
        state: TaskState.TODO
      });
    }
  }
}
