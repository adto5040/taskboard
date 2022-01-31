import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [];

  constructor() { }

  getTasks(): Task[] {
    return this.tasks.slice();
  }

  createTask(task: Task) {
    this.tasks.push(task);
  }

  updateTask() {
    // - TODO
  }

  deleteTask() {
    // - TODO
  }
}
