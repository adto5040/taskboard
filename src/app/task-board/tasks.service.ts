import { Injectable } from '@angular/core';
import { Task, TaskServer } from './task.model';
import { TaskState } from './task-state.enum';
import {
  map,
  merge,
  Observable,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap
} from 'rxjs';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  add,
  deleteAll,
  removeAtIndex,
  update
} from './tasks-functions.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineTaskService {
  constructor(private http: HttpClient) {}

  private getTasksObservable$: Observable<Task[]> = this.http
    .get<TaskServer[]>(environment.API_URL)
    .pipe(
      map((tasks: TaskServer[]) => {
        return tasks.map((task: TaskServer) => {
          let state = TaskState.TODO;
          if (task.isInProgress) state = TaskState.DOING;
          else if (task.isComplete) state = TaskState.DONE;
          return {
            guid: task.guid,
            title: task.title,
            text: task.text,
            isFavorite: task.isFavorite,
            state: state
          };
        });
      })
    );

  private tasksChanged$$ = new Subject<void>();

  getTasks$(): Observable<Task[]> {
    return this.tasksChanged$$.pipe(
      startWith('just trigger init subject'),
      switchMap(() => {
        return this.getTasksObservable$;
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  createTask(task: Task) {
    this.http
      .post(environment.API_URL, {
        guid: Guid.raw(),
        title: task.title,
        text: task.text,
        isComplete: false,
        isInProgress: false,
        isFavorite: false
      })
      .subscribe(() => this.tasksChanged$$.next());
  }

  updateTask(task: Task) {
    this.http
      .put(environment.API_URL, {
        guid: task.guid,
        title: task.title,
        text: task.text,
        isFavorite: task.isFavorite,
        isInProgress: task.state === TaskState.DOING,
        isComplete: task.state === TaskState.DONE
      })
      .subscribe(() => this.tasksChanged$$.next());
  }

  deleteTask(guid: string) {
    this.http
      .delete(environment.API_URL + '/' + guid)
      .subscribe(() => this.tasksChanged$$.next());
  }

  deleteAllTasks() {
    console.log('This method is not implemented!');
  }
}

@Injectable({
  providedIn: 'root',
  useExisting: OnlineTaskService
})
export class TasksService {
  private initTasks: Task[] = [
    {
      guid: Guid.raw(),
      title: 'First TODO',
      text: 'Test text',
      isFavorite: false,
      state: TaskState.TODO
    },
    {
      guid: Guid.raw(),
      title: 'Just do it',
      text: 'Another test text',
      isFavorite: true,
      state: TaskState.TODO
    },
    {
      guid: Guid.raw(),
      title: 'Just do it',
      text: "I'm currently working on that",
      isFavorite: true,
      state: TaskState.DOING
    },
    {
      guid: Guid.raw(),
      title: 'Finish it',
      text: 'This should be finished',
      isFavorite: false,
      state: TaskState.DONE
    }
  ];

  // Subject that represents the specific event
  private add$$ = new Subject<Task>();
  private removeAtIndex$$ = new Subject<string>();
  private update$$ = new Subject<Task>();
  private deleteAll$$ = new Subject<void>();

  private tasks$ = merge(
    // Applies the first (outer) mutate function to your event Subject
    this.add$$.pipe(map(add)),
    this.removeAtIndex$$.pipe(map(removeAtIndex)),
    this.update$$.pipe(map(update)),
    this.deleteAll$$.pipe(map(deleteAll))
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
