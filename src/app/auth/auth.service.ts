import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  token: string | null = null;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  authenticate(username: string, password: string) {
    return this.http
      .post(
        'http://localhost:8080/authenticate',
        {
          username: username,
          password: password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((res: HttpResponse<any>) => {
          const token = res.headers.get('Authorization')?.split(' ')[1];
          console.log(token);
          if (token) {
            this.handleAuthenticatedUser(username, token, 7200000);
          }
        })
      )
      .subscribe();
  }

  autologout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthenticatedUser(
    email: string,
    token: string,
    expiresIn: number
  ) {
    console.log(email, token, expiresIn);
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.userSubject.next(user);
    this.autologout(expiresIn * 1000);
  }
}
