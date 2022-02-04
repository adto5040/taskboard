import { initTasks, TasksService } from './tasks.service';
import { fakeAsync, tick } from '@angular/core/testing';
import { Task } from './task.model';
import { Subscription } from 'rxjs';
import { TaskState } from './task-state.enum';

describe('TasksService', () => {
  let service: TasksService;
  let subs: Subscription = new Subscription();
  beforeEach(() => {
    service = new TasksService();
  });

  afterAll(() => {
    subs.unsubscribe();
  });

  it('getTasks$ should return the initTasks', fakeAsync(() => {
    let expectedRes: Task[] = [];

    subs.add(
      service.getTasks$().subscribe(tasks => {
        expectedRes = tasks;
      })
    );
    tick();
    expect(expectedRes).toBe(initTasks);
  }));

  it('should be possible to delete a task', fakeAsync(() => {
    let expectedTasks: Task[] = [];
    subs.add(
      service.getTasks$().subscribe((tasks: Task[]) => {
        expectedTasks = tasks;
      })
    );
    tick();
    expect(expectedTasks[0].guid).toBe(initTasks[0].guid);

    service.deleteTask(initTasks[0].guid);
    tick();
    expect(expectedTasks[0].guid).not.toBe(initTasks[0].guid);
  }));

  it('should be possible to update a task', fakeAsync(() => {
    let expectedTasks: Task[] = [];
    const newTitle = 'Other title';
    const newState = TaskState.DONE;
    const uTask: Task = {
      ...initTasks[0],
      title: newTitle,
      state: newState
    };
    subs.add(
      service.getTasks$().subscribe((tasks: Task[]) => {
        expectedTasks = tasks;
      })
    );
    tick();
    expect(expectedTasks[0].title).toBe(initTasks[0].title);
    expect(expectedTasks[0].state).toBe(initTasks[0].state);

    service.updateTask(uTask);
    tick();
    expect(expectedTasks[0].title).toBe(newTitle);
    expect(expectedTasks[0].state).toBe(newState);
  }));
});
