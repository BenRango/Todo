import { Component, input } from '@angular/core';
import { ValidatorInterface } from '../validator-interface';
import { PasswordStrenghtBar } from "../password-strenght-bar/password-strenght-bar";

@Component({
  selector: 'app-password-evaluator',
  imports: [PasswordStrenghtBar],
  templateUrl: './password-evaluator.html',
  styleUrl: './password-evaluator.scss',
})
export class PasswordEvaluator {
  value = input<string>("aubergine")
  level = 0
  
  validators = input<ValidatorInterface[]>([
    { label: "Au moins 8 caractères", isValid: this.hasMinLength.bind(this) },
    { label: "1 majuscule", isValid: this.hasUppercase.bind(this) },
    { label: "1 chiffre", isValid: this.hasNumber.bind(this) }
  ])
  colors = ['#EF4444', '#F59E0B',  '#10B981']
  getLevel(): number {
    this.level = 0
    for (const validator of this.validators()) {
      if (validator.isValid()) {
        console.log("valid : ", validator.label, '\nlevel : ', this.level)
        this.level = this.level + 1
      }
    }
    return this.level;
  }
  validIcon = "/icons/valid.png"
  invalidIcon = "/icons/not-valid.png"
  hasMinLength(): boolean {
    return this.value().length >= 8;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.value());
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.value());
  }
}
