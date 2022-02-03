import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card.component';
import { TaskState } from '../task-state.enum';
import { Task } from '../task.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskEditComponent } from '../task-edit/task-edit.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  const todoTask: Task = {
    guid: '123',
    title: 'A Todo task',
    text: 'A simple todo description',
    isFavorite: false,
    state: TaskState.TODO
  };
  const doingTask: Task = {
    guid: '125',
    title: 'A Doing task',
    text: 'A simple doing description',
    isFavorite: true,
    state: TaskState.DOING
  };
  const doneTask: Task = {
    guid: '124',
    title: 'A Done task',
    text: 'A simple done description',
    isFavorite: false,
    state: TaskState.DONE
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent, TaskEditComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display todo card correctly', () => {
    component.task = todoTask;
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toBe(component.task.title);
  });

  it('should display doing card correctly', () => {
    component.task = doingTask;
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toBe(component.task.title);
  });

  it('should display done card correctly', () => {
    component.task = doneTask;
    fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3.textContent).toBe(component.task.title);
  });

  it('when click on task, it can be edited', () => {
    component.task = todoTask;
    fixture.detectChanges();
    expect(component.editMode).toBeFalsy();

    // Click on task
    fixture.nativeElement.querySelector('.content').click();
    fixture.detectChanges();
    expect(component.editMode).toBeTruthy();
  });

  it('when a task is saved, the edit mode is automatically terminated', () => {
    component.task = todoTask;
    component.editMode = true;
    fixture.detectChanges();
    expect(component.editMode).toBeTruthy();

    component.onUpdate(doneTask);
    fixture.detectChanges();
    expect(component.editMode).toBeFalsy();
  });
});
