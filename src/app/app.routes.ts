import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./login/login').then(m => m.Login) },
    { path: 'register', loadComponent: () => import('./sign-up/sign-up').then(m => m.SignUp) },
    { path: 'otp', loadComponent: () => import('./otp-input/otp-input').then(m => m.OtpInputComponent) },
    { path: 'password-bar', loadComponent: () => import('./password-strenght-bar/password-strenght-bar').then(m => m.PasswordStrenghtBar) },
    { path: 'forgotten-password', loadComponent: () => import('./forgotten-password/forgotten-password').then(m=>m.ForgottenPassword)},
    { path: '**', redirectTo: '' },


];
