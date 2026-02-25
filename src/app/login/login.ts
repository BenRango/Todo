import { Component, inject } from '@angular/core';
import { InputForm } from "../input-form/input-form";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [InputForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loading: boolean = false;
  user = inject(UserService)
  auth = inject(AuthService)

  constructor(private router : Router) {}
  setLoading(value?: boolean) {
    this.loading = value? value : true;
  }
  validateEmail(){
  }
  loginCheck() {
    this.validateEmail()
    try {
      this.setLoading()
      this.auth.logIn().subscribe({
        next: () => {
          this.auth.redirectToExternal()
        },
        error: (err: Error) => {
          console.error("Erreur de login", err);
          this.setLoading(false)
        }
      });
    } catch (error) {
      this.setLoading(false)
    }
  }
  navigate(route: string) {
    this.router.navigate([route]);
  }
}
