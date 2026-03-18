import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAdder } from './task-adder';

describe('TaskAdder', () => {
  let component: TaskAdder;
  let fixture: ComponentFixture<TaskAdder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAdder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAdder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
