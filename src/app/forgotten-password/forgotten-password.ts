import { Component, computed, inject, model, signal } from '@angular/core';
import { InputForm } from "../input-form/input-form";
import { Router } from '@angular/router';
import { OtpInputComponent } from "../otp-input/otp-input";
import { InputInterface } from '../input-interface';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotten-password',
  imports: [InputForm, OtpInputComponent],
  templateUrl: './forgotten-password.html',
  styleUrls: ['./forgotten-password.scss', "../login/login.scss", '../sign-up/sign-up.scss', ],
})
export class ForgottenPassword {
  currentStep : number = 1
  user = inject(UserService)
  auth = inject(AuthService)
  OTP = model("")
  isOtpValid = model(false) 
  passwordValid = signal(false);
  isEmailValid = signal(false);
  confirmValid = signal(false);
  
  inputs = computed<InputInterface[]>(() => [
    { 
      type: "password", 
      label: "Nouveau mot de passe",
      isSetter: true, 
      placeholder: "Entrez votre mot de passe",
      value: this.auth.newPassword(),
      onUpdate: (v?: string) => this.auth.newPassword.set(v!),
      confirmValid: false,
      onValidChange: (v: boolean) => this.passwordValid.set(v)
    },
    { 
      type: "password", 
      label: "Confirmer le nouveau mot de passe", 
      placeholder: "Confirmez votre mot de passe",
      witness: this.auth.newPassword(),
      value: this.auth.newPasswordConfirm(),
      onUpdate: (v?: string) => this.auth.newPasswordConfirm.set(v!),
      confirmValid: false,
      onValidChange: (v: boolean) => this.confirmValid.set(v)
      
    },
  ]);
  constructor(private router : Router) {}

  isFormValid() {
    if (this.currentStep < 3) {
      return this.isEmailValid(); 
    }
    else{
      return this.passwordValid() && this.confirmValid()
    }
    
  }
  nextStep(){
    try {
      if (this.isFormValid()) {
        if (this.currentStep === 1) {
          this.auth.generateOTP().subscribe()
        }
        if (this.currentStep === 2) {
          if (!this.isOtpValid()) {
            return
          }
        }
        if (this.currentStep === 3) {
          this.auth.resetPassword(this.OTP()).subscribe()
        }
        if (this.currentStep === 4) {
          this.currentStep = 0
          this.navigate('')
        }
      this.currentStep++;
    }
    } catch (error) {
      alert(error)
    }
    
  }
  navigate(route: string) {
    this.router.navigate([route]);
  }
}
