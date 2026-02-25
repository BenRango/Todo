import { Component, computed, effect, EventEmitter, input, model, output, signal } from '@angular/core';
import { PasswordEvaluator } from "../password-evaluator/password-evaluator";

@Component({
  selector: 'app-input-form',
  imports: [PasswordEvaluator],
  templateUrl: './input-form.html',
  styleUrl: './input-form.scss',
})
export class InputForm {
  isPasswordVisible = signal(false);
  isTouched = signal(false);
  onChange = input<(value: string) => void>()
  disabled = input<boolean>(false)
  label = input<string>("")
  checked = model<boolean>(false)
  login = input<boolean>(false)
  isSetter = input<boolean | undefined>(false)
  witness = input<string |undefined>("")
  type = input<"text" | "password" | "email" | "checkbox" >("text")
  value = model<string |undefined>("")
  placeholder = input<string | undefined>("")
  validChange = output<boolean>();
  passwordValidators = [
    { label: "8 caractères minimum", isValid: this.hasMinLength.bind(this) },
    { label: "1 lettre majuscule", isValid: this.hasUppercase.bind(this) },
    { label: "1 chiffre", isValid: this.hasNumber.bind(this) },
  ]

  isValid = computed(() => {
    if (this.forceError()) return false;
    const val = this.value() || "";

    if (this.type() === 'email') {
      return /^[a-z0-9.+_-]+@[a-z0-9-]+\.[a-z]{2,5}$/i.test(val);
    }

    if (this.type() === 'password') {
      const basicValidation = this.hasMinLength() && this.hasUppercase() && this.hasNumber();
      if (this.witness() !== undefined) {
        return basicValidation && val === this.witness();
      }
      return basicValidation;
    }

    return true; 
  });

  forceError = input<boolean>(false);

  inputClass = computed(() => {
    const hasError = !this.isValid();
    const showingError = this.isTouched() || this.forceError();
    const condition = (hasError && showingError) && (this.type()=="email" || this.type()=="password" && !this.login()) &&this.value()
    return condition ? 'input--error' : '';
  });

  onBlur() {
    this.isTouched.set(true);
  }
  onInput(event: Event) {
    this.isTouched.set(false);
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
  
  toggleVisibility() {
    if (this.type() === 'password') {
      this.isPasswordVisible.update(v => !v);
    }
  }

  hasMinLength(): boolean {
    return !!this.value() && this.value()!.length >= 8;
  }
  isEmail(): boolean {
    const regex = /^[a-z0-9.+_-]+@[a-z0-9-]+\.[a-z]{2,5}$/i;
    return regex.test(this.value()!);

  }
  hasUppercase(): boolean {
    return /[A-Z]/.test(this.value()!);
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.value()!);
  }

  constructor() {
    effect(() => {
      this.validChange.emit(this.isValid());
    });
  }
}
