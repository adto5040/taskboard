import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBoardComponent } from './task-board.component';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { TaskState } from './task-state.enum';
import {
  add,
  deleteAll,
  removeAtIndex,
  update
} from './tasks-functions.service';
import { Observable, of } from 'rxjs';
import { filterState } from './task-board.functions';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskQuickAddComponent } from './task-quick-add/task-quick-add.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;

  const newTask: Task = {
    guid: '',
    title: 'A New task',
    text: 'A simple todo description',
    state: TaskState.DOING
  };
  let taskServiceSub: Partial<TasksService>;
  let tasks: Task[] = [];
  let tasksService: TasksService;

  taskServiceSub = {
    createTask(task: Task) {
      const addFct = add(task);
      tasks = addFct(tasks);
      console.log('New tasks: ', tasks);
    },
    deleteTask(guid: string) {
      const removeFct = removeAtIndex(guid);
      tasks = removeFct(tasks);
    },
    updateTask(task: Task) {
      const updFct = update(task);
      tasks = updFct(tasks);
    },
    deleteAllTasks() {
      const delFct = deleteAll();
      tasks = delFct();
    },
    getTasks$(): Observable<Task[]> {
      return of(tasks);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaskBoardComponent,
        TaskListComponent,
        TaskQuickAddComponent
      ],
      imports: [ReactiveFormsModule],
      providers: [{ provide: TasksService, useValue: taskServiceSub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tasksService = fixture.debugElement.injector.get(TasksService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create task', () => {
    tasksService.createTask = jasmine.createSpy();
    component.onAdd(newTask);
    expect(tasksService.createTask).toHaveBeenCalledWith(newTask);
  });

  describe('test filter', () => {
    const demoTasks = [
      {
        title: 'First TODO',
        text: 'Test text',
        state: TaskState.TODO,
        guid: '1'
      },
      {
        title: 'Just do it',
        text: 'Another test text',
        state: TaskState.TODO,
        guid: '2'
      },
      {
        title: 'Just do it',
        text: "I'm currently working on that",
        state: TaskState.DOING,
        guid: '3'
      },
      {
        title: 'Finish it',
        text: 'This should be finished',
        state: TaskState.DONE,
        guid: '4'
      }
    ];

    it('should filter TODO tasks correctly', () => {
      const filterFct = filterState(TaskState.TODO);
      filterFct(of(demoTasks)).subscribe(tasks => {
        expect(tasks.map(task => task.guid).join('')).not.toBe('3');
        expect(tasks.map(task => task.guid).join('')).toBe('12');
      });
    });

    it('should filter DOING tasks correctly', () => {
      const filterFct = filterState(TaskState.DOING);
      filterFct(of(demoTasks)).subscribe(tasks => {
        expect(tasks.map(task => task.guid).join('')).not.toBe('12');
        expect(tasks.map(task => task.guid).join('')).toBe('3');
      });
    });

    it('should filter DONE tasks correctly', () => {
      const filterFct = filterState(TaskState.DONE);
      filterFct(of(demoTasks)).subscribe(tasks => {
        expect(tasks.map(task => task.guid).join('')).not.toBe('3');
        expect(tasks.map(task => task.guid).join('')).toBe('4');
      });
    });
  });
});
