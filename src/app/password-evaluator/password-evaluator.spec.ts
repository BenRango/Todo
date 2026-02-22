import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEvaluator } from './password-evaluator';

describe('PasswordEvaluator', () => {
  let component: PasswordEvaluator;
  let fixture: ComponentFixture<PasswordEvaluator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordEvaluator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordEvaluator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
