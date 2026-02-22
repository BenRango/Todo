import { Component, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-input-form',
  imports: [],
  templateUrl: './input-form.html',
  styleUrl: './input-form.scss',
})
export class InputForm {
  isPasswordVisible = signal(false);
  label = input<string>("")
  checked = model<boolean>(false)
  login = input<boolean>(false)

  toggleVisibility() {
    if (this.type() === 'password') {
      this.isPasswordVisible.update(v => !v);
    }
  }
  type = input<"text" | "password" | "email" | "checkbox" >("text")
  value = ""
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value; // On met à jour la valeur en temps réel
  }
  placeholder = input<string>("")
}
