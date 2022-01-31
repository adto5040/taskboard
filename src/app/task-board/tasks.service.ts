import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { TaskState } from './task-state.enum';
import { Subject } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [{
    description: 'Test description',
    state: TaskState.TODO,
    id: '123',
    summary: 'First TODO'
  },
    {
      description: 'Test description2',
      state: TaskState.TODO,
      id: '1232',
      summary: 'First TODO 2 2 '
    }];

  tasksChanged = new Subject<Task[]>();

  constructor() { }

  tasksChangedUpdate() {
    this.tasksChanged.next(this.tasks.slice());
  }

  getTasks(state: TaskState): Task[] {
    return this.tasks.filter(task => task.state === state);
  }

  createTask(task: Task) {
    const guid = Guid.raw();
    this.tasks.push({...task, id: guid, state: TaskState.TODO});
    this.tasksChangedUpdate();
  }

  updateTask(task: Task) {
    // - TODO
    console.log(task);
  }

  deleteTask(id: string) {
    const idx = this.tasks.findIndex(task => task.id === id);
    if (idx > -1) {
      this.tasks.splice(idx, 1);
      this.tasksChangedUpdate();
    }
  }
}
