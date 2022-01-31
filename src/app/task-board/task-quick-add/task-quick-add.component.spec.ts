import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskQuickAddComponent } from './task-quick-add.component';

describe('TaskQuickAddComponent', () => {
  let component: TaskQuickAddComponent;
  let fixture: ComponentFixture<TaskQuickAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskQuickAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskQuickAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
