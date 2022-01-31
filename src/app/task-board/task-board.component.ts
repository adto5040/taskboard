import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskState } from './task-state.enum';
import { Subscription } from 'rxjs';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Component({
  selector: 'tb-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  tasksTodo: Task[] = [];
  tasksDoing: Task[] = [];
  tasksDone: Task[] = [];
  stateTodo = TaskState.TODO;
  stateDoing = TaskState.DOING;
  stateDone = TaskState.DONE;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    const tasks = this.tasksService.getTasks();
    this.updateTasks(tasks);

    this.subscription = this.tasksService.tasksChanged$$
      .subscribe((updatedTasks: Task[]) => {
        this.updateTasks(updatedTasks);
    })
  }

  updateTasks(tasks: Task[]) {
    this.tasksTodo = tasks.filter(task => task.state === this.stateTodo);
    this.tasksDoing = tasks.filter(task => task.state === this.stateDoing);
    this.tasksDone = tasks.filter(task => task.state === this.stateDone);
  }

  onDelete(id: string) {
    this.tasksService.deleteTask(id);
  }

  onAdd(task: Task) {
    this.tasksService.createTask(task);
  }

  onEdit(task: Task) {
    this.tasksService.updateTask(task);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
