import { Component, input, model, signal } from '@angular/core';
import { PasswordEvaluator } from "../password-evaluator/password-evaluator";

@Component({
  selector: 'app-input-form',
  imports: [PasswordEvaluator],
  templateUrl: './input-form.html',
  styleUrl: './input-form.scss',
})
export class InputForm {
  isPasswordVisible = signal(false);
  label = input<string>("")
  checked = model<boolean>(false)
  login = input<boolean>(false)
  isSetter = input<boolean>(false)
  witness = input<string>("")
  toggleVisibility() {
    if (this.type() === 'password') {
      this.isPasswordVisible.update(v => !v);
    }
  }
  type = input<"text" | "password" | "email" | "checkbox" >("text")
  value = model<string>("")

  hasMinLength(): boolean {
    return !!this.value() && this.value().length >= 8;
  }
  hasUppercase(): boolean {
    return /[A-Z]/.test(this.value());
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.value());
  }

  passwordValidators = [
    { label: "8 caractères minimum", isValid: this.hasMinLength.bind(this) },
    { label: "1 lettre majuscule", isValid: this.hasUppercase.bind(this) },
    { label: "1 chiffre", isValid: this.hasNumber.bind(this) },
  ]
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
  placeholder = input<string>("")
}
