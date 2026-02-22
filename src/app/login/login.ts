import { Component } from '@angular/core';
import { InputForm } from "../input-form/input-form";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private router : Router) {}
  navigate(route: string) {
    this.router.navigate([route]);
  }
}
