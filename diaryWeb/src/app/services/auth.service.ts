import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserData } from '../models/user.data';
import { appRoutesConfig } from '../routes/app-routes.config';
import { apiUrls } from './api-urls';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static _loggedIn = new BehaviorSubject<boolean>(false);
  private static _userData = new BehaviorSubject<IUserData>({
    id: '',
    login: '',
    token: '',
  });

  constructor(
    private http: HttpClient,
    private crypto: CryptoService,
    private router: Router
  ) {
    const userData = this.getUserDataLocalStorage();
    if (userData) {
      this.saveUserData(userData);
    }
  }

  register(request: any): Observable<any> {
    return this.http.post<IUserData>(apiUrls.auth.register, request).pipe(
      tap((user) => {
        this.saveUserData(user);
      })
    );
  }

  login(request: any): Observable<any> {
    return this.http.post<IUserData>(apiUrls.auth.login, request).pipe(
      tap((user) => {
        this.saveUserData(user);
      })
    );
  }

  logout(): void {
    // Удаляем данные пользователя из cookie
    localStorage.removeItem('userData');
    AuthService._userData.next({ id: '', login: '', token: '' });
    AuthService._loggedIn.next(false);
    this.router.navigate([appRoutesConfig.auth.path]);

    if ('caches' in window) {
      caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
          caches.delete(cacheName);
        });
      });
    }
  }

  isLoggedIn() {
    return AuthService._loggedIn.asObservable();
  }

  getUserData() {
    return AuthService._userData.asObservable();
  }

  getUserToken(): string {
    return AuthService._userData.getValue().token;
  }

  getUserId(): string {
    return AuthService._userData.getValue().id;
  }

  private getUserDataLocalStorage() {
    const userData = localStorage.getItem('userData');
    if (userData) return JSON.parse(this.crypto.decryptData(userData));
    return null;
  }

  private saveUserData(user: IUserData) {
    const userDataEncrypt = this.crypto.encryptData(JSON.stringify(user));
    localStorage.setItem('userData', userDataEncrypt);
    AuthService._userData.next(user);
    AuthService._loggedIn.next(true);
  }
}
