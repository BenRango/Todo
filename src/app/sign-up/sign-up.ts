import { Component, computed, inject, model, signal } from '@angular/core';
import { InputForm } from "../input-form/input-form";
import { Router } from '@angular/router';
import { inputTypes } from '../types';
import { InputInterface } from '../input-interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  imports: [InputForm],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss',"../login/login.scss"],
})
export class SignUp {
  loading = false
  lastStep = signal(false);
  user = inject(UserService)
  email = signal("");
  name = signal("");
  password = signal("");
  confirmPassword = signal("");
  isEmailValid = signal(false);
  nameValid = signal(false);
  passwordValid = signal(false);
  confirmValid = signal(false);
  checkBoxValid = signal(false);
  auth= inject(AuthService)
  onEmailChange (v?: string){
    this.email.set(v!)
  }
  inputs = computed<InputInterface[]>(() => [
    { 
      type: "text", 
      label: "Nom complet",
      placeholder: "Entrez votre nom complet", 
      value: this.name(), 
      onUpdate: (v?: string) => this.name.set(v!),
      confirmValid: true,
       onValidChange: (v: boolean) => this.nameValid.set(v)
    },
    { 
      type: "password", 
      label: "Mot de passe",
      isSetter: true, 
      placeholder: "Entrez votre mot de passe",
      value: this.password(),
      onUpdate: (v?: string) => this.password.set(v!),
      confirmValid: false,
      onValidChange: (v: boolean) => this.passwordValid.set(v)
    },
    { 
      type: "password", 
      label: "Confirmer le mot de passe", 
      placeholder: "Confirmez votre mot de passe",
      witness: this.password(),
      value: this.confirmPassword(),
      onUpdate: (v?: string) => this.confirmPassword.set(v!),
      confirmValid: false,
      onValidChange: (v: boolean) => this.confirmValid.set(v)
      
    },
    { 
      type: 'checkbox', 
      label: "Souviens-toi de moi",
      onUpdate: (v?: string) => void(0),
      confirmValid: true,   
      onValidChange: (v: boolean) => this.checkBoxValid.set(v)
    }
  ]);
  setLoading(value: boolean) {
    this.loading = value;
  }
  isFormValid() {
    if (!this.lastStep()) {
      return this.isEmailValid(); 
    }
    return this.nameValid() && this.passwordValid() && this.confirmValid();
  }
  swapStep() {
    this.lastStep.update(v => !v);
  }
  constructor(private router : Router) {}
  
  navigate(route: string) {
    this.router.navigate([route]);
  }

  signUpCheck() {
    try {
      this.loading = true;
      this.user.email = this.email()
      this.user.username = this.name()
      this.user.password = this.password()
      this.auth.confirmPassword = this.confirmPassword()
      this.auth.signUp().subscribe({
        next: () => {
          this.auth.redirectToExternal()
        },
        error: (err: Error) => {
          console.error("Erreur de signup", err);
        }
      });
    } catch (error) {
        this.setLoading(false)
    }
    
  }
}
