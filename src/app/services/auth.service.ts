import { inject, Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';

import { UserService } from './user.service';
import {jwtDecode} from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment.mjs';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private token : string = ""
  response: {message: string} | null = null;
  user= inject(UserService)
  confirmPassword = ""
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
  redirectToExternal() {
    window.location.href = 'https://elia.benrango.com';
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
