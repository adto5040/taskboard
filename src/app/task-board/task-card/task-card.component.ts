import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'tb-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Output() deleteItem = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.deleteItem.emit(this.task.id);
  }
}
