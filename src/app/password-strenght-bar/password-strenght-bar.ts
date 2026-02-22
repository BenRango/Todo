import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-password-strenght-bar',
  imports: [],
  templateUrl: './password-strenght-bar.html',
  styleUrl: './password-strenght-bar.scss',
})
export class PasswordStrenghtBar {
  count: number = 0;
  level = input(0);
  colors = input<string[]>(['#EF4444', '#F97316', '#F59E0B', '#84CC16', '#22C55E', '#10B981']);

  getColor(): string {
    const index = Math.min(Math.floor((this.level()*this.colors().length-1)/100), this.colors().length - 1);
    return this.colors()[index] || 'gray';
  }
}
