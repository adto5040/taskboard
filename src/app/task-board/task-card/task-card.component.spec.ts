import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card.component';
import { TaskState } from '../task-state.enum';
import { Task } from '../task.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  const todoTask: Task = {
    guid: '123',
    title: 'A Todo task',
    text: 'A simple todo description',
    state: TaskState.TODO
  };
  const doingTask: Task = {
    guid: '125',
    title: 'A Doing task',
    text: 'A simple doing description',
    state: TaskState.DOING
  };
  const doneTask: Task = {
    guid: '124',
    title: 'A Done task',
    text: 'A simple done description',
    state: TaskState.DONE
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
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
});
