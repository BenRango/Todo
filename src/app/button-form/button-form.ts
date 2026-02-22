import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button-form',
  imports: [],
  templateUrl: './button-form.html',
  styleUrl: './button-form.scss',
})
export class ButtonForm {
  label = input<string>("Button")
}
