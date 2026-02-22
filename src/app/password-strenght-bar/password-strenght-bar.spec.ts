import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrenghtBar } from './password-strenght-bar';

describe('PasswordStrenghtBar', () => {
  let component: PasswordStrenghtBar;
  let fixture: ComponentFixture<PasswordStrenghtBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordStrenghtBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordStrenghtBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
