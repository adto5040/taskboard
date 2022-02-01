import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskState } from '../task-state.enum';
import { Task } from '../task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'tb-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() state!: TaskState;
  @Input() tasks$!: Observable<Task[]>;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Task>();

  constructor() {}

  ngOnInit(): void {}

  onDelete(id: string) {
    this.deleteTask.emit(id);
  }

  onEdit(task: Task) {
    this.editTask.emit(task);
  }
}
