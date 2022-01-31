import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaskState } from '../task-state.enum';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tb-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() state: TaskState = TaskState.TODO;
  tasks: Task[] = [];
  private subscription!: Subscription;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks(this.state);
    this.subscription = this.tasksService.tasksChanged.subscribe((updatedTasks: Task[]) => {
      this.tasks = updatedTasks.filter(task => task.state === this.state);
    })
  }

  onDelete(id: string) {
    this.tasksService.deleteTask(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
