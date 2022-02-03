import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task.model';
import { TaskState } from '../task-state.enum';

@Component({
  selector: 'tb-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task?: Task;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<Task>();
  editMode = false;
  taskState = TaskState;

  constructor() {}

  ngOnInit(): void {}

  onDelete() {
    if (this.task) {
      this.deleteTask.emit(this.task.guid);
    }
  }

  onSelect() {
    this.editMode = true;
  }

  onUpdate(task: Task) {
    this.editMode = false;
    this.editTask.emit(task);
  }

  previousStage() {
    this.getFutureStage(-1);
  }

  nextStage() {
    this.getFutureStage(1);
  }

  triggerFavorite() {
    if (this.task) {
      this.editTask.emit({ ...this.task, isFavorite: !this.task.isFavorite });
    }
  }

  private getFutureStage(step: number) {
    if (this.task) {
      const states = Object.values(this.taskState);
      const idx = states.indexOf(this.task.state);
      if (idx > -1 && idx < states.length) {
        const nextStage = states[idx + step];
        this.editTask.emit({ ...this.task, state: nextStage });
      }
    }
  }
}
