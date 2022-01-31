import { Component, OnInit } from '@angular/core';
import { TaskState } from './task-state.enum';

@Component({
  selector: 'tb-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  taskStates: TaskState[] = Object.values(TaskState);

  constructor() { }

  ngOnInit(): void {
  }

}
