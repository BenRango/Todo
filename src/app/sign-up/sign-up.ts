import { Component } from '@angular/core';
import { InputForm } from "../input-form/input-form";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [InputForm],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss',"../login/login.scss"],
})
export class SignUp {
  lastStep = false
  swapStep() {
    this.lastStep = !this.lastStep
  }
  constructor(private router : Router) {}
  navigate(route: string) {
    this.router.navigate([route]);
  }
}
