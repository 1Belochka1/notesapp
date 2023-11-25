import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuthenticationResponse } from '../models/authenticationResponse';
import { appRoutes } from '../routes/appRoutes';
import { apiUrls } from './api-urls';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private static _loggedIn = new BehaviorSubject<boolean>(false);
	private static _userData = new BehaviorSubject<IAuthenticationResponse>({
		id: '',
		login: '',
		token: '',
	});

	constructor(private http: HttpClient, private router: Router) {
		// Проверяем, сохранены ли данные пользователя в cookie
		const userData = this.getCookie('user');
		if (userData) {
			AuthService._userData.next(JSON.parse(userData));
			AuthService._loggedIn.next(true);
		}
	}

	register(request: any): Observable<any> {
		return this.http
			.post<IAuthenticationResponse>(apiUrls.auth.register, request)
			.pipe(
				tap((user) => {
					// Сохраняем данные пользователя в cookie
					this.setCookie('user', JSON.stringify(user), 7);
					AuthService._userData.next(user);
					AuthService._loggedIn.next(true);
				})
			);
	}

	login(request: any): Observable<any> {
		return this.http
			.post<IAuthenticationResponse>(apiUrls.auth.login, request)
			.pipe(
				tap((user) => {
					// Сохраняем данные пользователя в cookie
					this.setCookie('user', JSON.stringify(user), 7);
					AuthService._userData.next(user);
					AuthService._loggedIn.next(true);
				})
			);
	}

	logout(): void {
		// Удаляем данные пользователя из cookie
		this.deleteCookie('user');
		AuthService._userData.next({ id: '', login: '', token: '' });
		AuthService._loggedIn.next(false);
		this.router.navigate([appRoutes.auth.path]);
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

	getUserLogin(): string {
		return AuthService._userData.getValue().id;
	}

	isLoginExist(login: string): Observable<boolean> {
		return this.http.get<boolean>(apiUrls.users.isLoginExist + `/${login}`);
	}

	private setCookie(name: string, value: string, days: number): void {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = `expires=${date.toUTCString()}`;
		document.cookie = `${name}=${value};${expires};path=/;SameSite=None;Secure`;
	}

	private getCookie(name: string): string {
		const cookieName = `${name}=`;
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			while (cookie.charAt(0) === ' ') {
				cookie = cookie.substring(1);
			}
			if (cookie.indexOf(cookieName) === 0) {
				return cookie.substring(cookieName.length, cookie.length);
			}
		}
		return '';
	}

	private deleteCookie(name: string): void {
		document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
	}
}
