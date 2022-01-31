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
    },
    {
      description: 'Something',
      state: TaskState.DOING,
      id: '123212',
      summary: 'Do something'
    },
    {
      description: 'Done Stuff',
      state: TaskState.DONE,
      id: '1232123',
      summary: 'Do this to done'
    }];

  tasksChanged$$ = new Subject<Task[]>();

  constructor() { }

  tasksChangedUpdate() {
    this.tasksChanged$$.next(this.tasks.slice());
  }

  getTasks(): Task[] {
    return this.tasks.slice();
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
