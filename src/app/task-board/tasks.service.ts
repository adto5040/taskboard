import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { TaskState } from './task-state.enum';
import {
  map,
  merge,
  Observable,
  scan,
  shareReplay,
  startWith,
  Subject
} from 'rxjs';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnlineTaskService {
  constructor(private http: HttpClient) {}

  getTasks$() {
    return this.http.get(environment.API_URL);
  }

  createTask(task: Task) {
    console.log(task);
    //this.add$$.next({ ...task, guid: Guid.raw(), state: TaskState.TODO });
  }

  updateTask(task: Task) {
    // - TODO
    console.log(task);
    // const oldtasks = [...tasks];
    // oldtasks[idx] = task;
  }

  deleteTask(guid: string) {
    console.log(guid);
    //this.removeAtIndex$$.next(guid);
  }

  deleteAllTasks() {
    //this.deleteAll$$.next();
  }
}

@Injectable({
  providedIn: 'root'
  //useExisting: OnlineTaskService
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
  private update = (task: Task) => (tasks: Task[]) => {
    const idx = tasks.findIndex(t => t.guid === task.guid);
    if (idx < 0) {
      return [...tasks];
    } else {
      return tasks
        .slice(0, idx)
        .concat(task)
        .concat(tasks.slice(idx + 1));
    }
  };
  private deleteAll = () => () => [];

  // Subject that represents the specific event
  private add$$ = new Subject<Task>();
  private removeAtIndex$$ = new Subject<string>();
  private update$$ = new Subject<Task>();
  private deleteAll$$ = new Subject<void>();

  private tasks$ = merge(
    // Applies the first (outer) mutate function to your event Subject
    this.add$$.pipe(map(this.add)),
    this.removeAtIndex$$.pipe(map(this.removeAtIndex)),
    this.update$$.pipe(map(this.update)),
    this.deleteAll$$.pipe(map(this.deleteAll))
  ).pipe(
    // Applies the second (inner) mutate function to finally mutate and return your updated state
    scan((tasks: Task[], fn) => fn(tasks), this.initTasks),
    startWith(this.initTasks)
  );

  constructor() {}

  getTasks$(): Observable<Task[]> {
    return this.tasks$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  createTask(task: Task) {
    this.add$$.next({ ...task, guid: Guid.raw(), state: TaskState.TODO });
  }

  updateTask(task: Task) {
    this.update$$.next(task);
  }

  deleteTask(guid: string) {
    this.removeAtIndex$$.next(guid);
  }

  deleteAllTasks() {
    this.deleteAll$$.next();
  }
}
