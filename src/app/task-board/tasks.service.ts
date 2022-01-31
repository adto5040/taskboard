import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = [];

  constructor() { }

  getTasks() {
    return this.tasks.slice();
  }

  createTask() {
    // - TODO
  }

  updateTask() {
    // - TODO
  }

  deleteTask() {
    // - TODO
  }
}
