import { inject, Inject, Injectable, OnInit, PLATFORM_ID, signal } from '@angular/core';

import { UserService } from './user.service';
import {jwtDecode} from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private token : string = ""
  response: {message: string} | null = null;
  user= inject(UserService)
  confirmPassword = ""
  newPassword = signal<string>("")
  newPasswordConfirm = signal<string>("")
  constructor( 
    private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object 
  ) 
  {}
  ngOnInit(): void {
  }
  signUp() {
    return (
      this.http.post<{token: string, user: User}>(`${environment.apiUrl}/auth/register/`, {...this.user, confirmPassword: this.confirmPassword}).pipe(tap(rep =>
      {
        localStorage.setItem("token", rep.token)
        this.turnTologgedIn(rep.token)
        return rep.user
      })))
  }

  resetPassword(otp : string) {
    return (
      this.http.patch<{token: string, user: User}>(`${environment.apiUrl}/auth/reset-password`, {otp, password : this.newPassword(), confirmPassword: this.newPasswordConfirm()})
      .pipe(tap(rep =>
        {
          console.log(rep)
          return null
        })
      ))
  }
  redirectToExternal() {
    const token = localStorage.getItem('token');
    window.location.href = `${environment.host}?token=${token}`;
  }
  logIn() {
    this.response = null
    return this.http.post<{token: string, user: User}>(`${environment.apiUrl}/auth/login/`, {
      email: this.user.getEmail(), 
      password: this.user.getPassword() 
    }).pipe(
      tap(rep => {
        localStorage.setItem("token", rep.token);
        this.turnTologgedIn(rep.token);
      }),
      catchError(error => {
        if (error.error && error.error.message) {
          this.response = { message: error.error.message };
        } else {
          this.response = { message: "Une erreur est survenue" };
        }
        return throwError(() => error);
      })
    );
  }
  checkOTP(otp : string){
    this.response = null
    return this.http.get(`${environment.apiUrl}/auth/otp/${otp}`).pipe(
      catchError(error => {
        if (error.error && error.error.message) {
          this.response = { message: error.error.message };
        } else {
          this.response = { message: "Une erreur est survenue" };
        }
        return throwError(() => error);
      })
    );
  }
  generateOTP(){
    this.response = null
    return this.http.post(`${environment.apiUrl}/auth/generate-otp`, {
      email: this.user.getEmail(),  
    }).pipe(
      catchError(error => {
        if (error.error && error.error.message) {
          this.response = { message: error.error.message };
        } else {
          this.response = { message: "Une erreur est survenue" };
        }
        return throwError(() => error);
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.token = "";
  }
  turnTologgedIn(token? : string)
  {
    this.token = token || this.getOldToken() || ""
  }
  isLoggedIn():boolean
  {
    this.token = this.getOldToken() || ""
    return !!this.token && !this.isTokenExpired()
  }
  getOldToken() : string|null
  {
    return localStorage.getItem('token')
  }
  isTokenExpired( token? : string):boolean
  {
    const oldToken = token || this.getOldToken();
    if(!oldToken)
    {
      return true
    }
    const decodedToken: any = jwtDecode(oldToken)
    console.log({decodedToken})
    let currentTime = Math.floor(Date.now() / 1000);
    this.user.setEmail(decodedToken.email)
    this.user.setId(decodedToken.user_id)
    this.user.setUsername(decodedToken.username)
    return decodedToken.exp < currentTime
  }
  getToken():string | "token"
  {
    this.token = this.user.getToken()
    return this.token
  }
  getUser()
  {
    return this.user
  }
}
