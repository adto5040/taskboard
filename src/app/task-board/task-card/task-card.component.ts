import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'tb-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Task>();
  editMode = false;

  constructor() {}

  ngOnInit(): void {}

  onDelete() {
    this.deleteTask.emit(this.task.guid);
  }

  onSelect() {
    this.editMode = true;
  }

  onUpdate(task: Task) {
    this.editTask.emit(task);
  }
}
