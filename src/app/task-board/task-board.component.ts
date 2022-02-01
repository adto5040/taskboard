import { Component, OnInit } from '@angular/core';
import { TaskState } from './task-state.enum';
import { map, Observable } from 'rxjs';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Component({
  selector: 'tb-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  tasks$: Observable<Task[]> = this.tasksService.getTasks$();
  tasksTodo$: Observable<Task[]> = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.state === TaskState.TODO))
  );
  tasksDoing$: Observable<Task[]> = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.state === TaskState.DOING))
  );
  tasksDone$: Observable<Task[]> = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.state === TaskState.DONE))
  );
  TaskState = TaskState;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  onDelete(id: string) {
    this.tasksService.deleteTask(id);
  }

  onAdd(task: Task) {
    this.tasksService.createTask(task);
  }

  onEdit(task: Task) {
    this.tasksService.updateTask(task);
  }
}
