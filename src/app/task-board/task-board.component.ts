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
  showDeleteButton = false;

  tasks$: Observable<Task[]> = this.tasksService.getTasks$();
  tasksTodo$: Observable<Task[]> = this.tasks$.pipe(
    this.filterState(TaskState.TODO)
  );
  tasksDoing$: Observable<Task[]> = this.tasks$.pipe(
    this.filterState(TaskState.DOING)
  );
  tasksDone$: Observable<Task[]> = this.tasks$.pipe(
    this.filterState(TaskState.DONE)
  );
  TaskState = TaskState;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  onDelete(guid: string) {
    this.tasksService.deleteTask(guid);
  }

  onAdd(task: Task) {
    this.tasksService.createTask(task);
  }

  onEdit(task: Task) {
    this.tasksService.updateTask(task);
  }

  onDeleteAllTasks() {
    this.tasksService.deleteAllTasks();
  }

  private filterState(state: TaskState) {
    return map((tasks: Task[]) => tasks.filter(task => task.state === state));
  }
}
