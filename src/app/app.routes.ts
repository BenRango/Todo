import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./login/login').then(m => m.Login)},
    
    {path: 'input-form', loadComponent: () => import('./input-form/input-form').then(m => m.InputForm)},
    {path: 'register', loadComponent: () => import('./sign-up/sign-up').then(m => m.SignUp)},
    {path: '**', redirectTo: ''}

];
