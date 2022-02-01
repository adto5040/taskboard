import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { TaskState } from './task-state.enum';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks$$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([
    {
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
    }
  ]);

  constructor() {}

  getTasks$(): Observable<Task[]> {
    return this.tasks$$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  createTask(task: Task) {
    const guid = Guid.raw();
    this.tasks$$.next([
      // Geht das auch anders?
      ...this.tasks$$.getValue(),
      { ...task, id: guid, state: TaskState.TODO }
    ]);
  }

  updateTask(task: Task) {
    // - TODO
    console.log(task);
  }

  deleteTask(id: string) {
    this.tasks$$.next([
      // Hier auch wieder getValue(), geht das anders?
      ...this.tasks$$.getValue().filter(task => task.id !== id)
    ]);
  }
}
