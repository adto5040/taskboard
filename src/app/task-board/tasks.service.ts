import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { TaskState } from './task-state.enum';
import { map, merge, Observable, scan, shareReplay, Subject } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private initTasks = [
    {
      summary: 'First TODO',
      description: 'Test description',
      state: TaskState.TODO,
      id: Guid.raw()
    },
    {
      summary: 'Just do it',
      description: 'Another test description',
      state: TaskState.TODO,
      id: Guid.raw()
    },
    {
      summary: 'Just do it',
      description: "I'm currently working on that",
      state: TaskState.DOING,
      id: Guid.raw()
    },
    {
      summary: 'Finish it',
      description: 'This should be finished',
      state: TaskState.DONE,
      id: Guid.raw()
    }
  ];

  // Functions that mutate the state/data aggregation
  private add = (task: Task) => (tasks: Task[]) => [...tasks, task];
  private removeAtIndex = (id: string) => (tasks: Task[]) =>
    tasks.filter(task => task.id !== id);
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
    this.add$$.next({ ...task, id: Guid.raw(), state: TaskState.TODO });
  }

  updateTask(task: Task) {
    // - TODO
    console.log(task);
  }

  deleteTask(id: string) {
    this.removeAtIndex$$.next(id);
  }

  deleteAllTasks() {
    this.deleteAll$$.next();
  }
}
