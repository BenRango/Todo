import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonForm } from './button-form';

describe('ButtonForm', () => {
  let component: ButtonForm;
  let fixture: ComponentFixture<ButtonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
