import { Component, Input, OnInit } from '@angular/core';
import { TaskState } from '../task-state.enum';

@Component({
  selector: 'tb-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() state: TaskState = TaskState.TODO;

  constructor() { }

  ngOnInit(): void {
  }

}
