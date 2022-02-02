import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { TaskState } from './task-state.enum';
import { map, merge, Observable, scan, shareReplay, Subject } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class OnlineTaskService {
  API_URL = 'http://localhost:3000/api/tasks';
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private initTasks = [
    {
      title: 'First TODO',
      text: 'Test text',
      state: TaskState.TODO,
      guid: Guid.raw()
    },
    {
      title: 'Just do it',
      text: 'Another test text',
      state: TaskState.TODO,
      guid: Guid.raw()
    },
    {
      title: 'Just do it',
      text: "I'm currently working on that",
      state: TaskState.DOING,
      guid: Guid.raw()
    },
    {
      title: 'Finish it',
      text: 'This should be finished',
      state: TaskState.DONE,
      guid: Guid.raw()
    }
  ];

  // Functions that mutate the state/data aggregation
  private add = (task: Task) => (tasks: Task[]) => [...tasks, task];
  private removeAtIndex = (guid: string) => (tasks: Task[]) =>
    tasks.filter(task => task.guid !== guid);
  private deleteAll = () => () => [];

  // Subject that represents the specific event
  private add$$ = new Subject<Task>();
  private removeAtIndex$$ = new Subject<string>();
  private deleteAll$$ = new Subject<void>();

  private tasks$ = merge(
    // Applies the first (outer) mutate function to your event Subject
    this.add$$.pipe(map(this.add)),
    this.removeAtIndex$$.pipe(map(this.removeAtIndex)),
    this.deleteAll$$.pipe(map(this.deleteAll))
  ).pipe(
    // Applies the second (inner) mutate function to finally mutate and return your updated state
    scan((tasks: Task[], fn) => fn(tasks), this.initTasks)
  );

  constructor() {}

  getTasks$(): Observable<Task[]> {
    return this.tasks$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  createTask(task: Task) {
    this.add$$.next({ ...task, guid: Guid.raw(), state: TaskState.TODO });
  }

  updateTask(task: Task) {
    // - TODO
    console.log(task);
  }

  deleteTask(guid: string) {
    this.removeAtIndex$$.next(guid);
  }

  deleteAllTasks() {
    this.deleteAll$$.next();
  }
}
