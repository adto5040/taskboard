import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditComponent } from './task-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskEditComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
