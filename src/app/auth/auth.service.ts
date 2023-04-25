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
          if (token) {
            this.handleAuthenticatedUser(username, token, 7200000);
          }
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.userSubject.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autologout(expirationDuration);
    }
  }

  autologout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration * 1000);
  }
  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/login']);
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
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    console.log(expiresIn);
    const user = new User(email, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.userSubject.next(user);
    this.autologout(expiresIn * 1000);
  }
}
