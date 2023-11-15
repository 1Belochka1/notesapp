import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuthenticationResponse } from '../models/authenticationResponse';
import { apiUrls } from './api-urls';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _loggedIn = new BehaviorSubject<boolean>(false);
	private _userData = new BehaviorSubject<IAuthenticationResponse | null>(null);

	constructor(private http: HttpClient) {
		// Проверяем, сохранены ли данные пользователя в cookie
		const userData = this.getCookie('user');
		if (userData) {
			this._userData.next(JSON.parse(userData));
			this._loggedIn.next(true);
		}
	}

	register(request: any): Observable<any> {
		return this.http
			.post<IAuthenticationResponse>(apiUrls.auth.register, request)
			.pipe(
				tap((user) => {
					// Сохраняем данные пользователя в cookie
					this.setCookie('user', JSON.stringify(user), 7);
					this._userData.next(user);
					this._loggedIn.next(true);
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
					this._userData.next(user);
					this._loggedIn.next(true);
				})
			);
	}

	logout(): void {
		// Удаляем данные пользователя из cookie
		this.deleteCookie('user');
		this._userData.next(null);
		this._loggedIn.next(false);
	}

	isLoggedIn(): Observable<boolean> {
		return this._loggedIn.asObservable();
	}

	getUserData(): Observable<any> {
		return this._userData.asObservable();
	}

	getUserToken(): string | null {
		return this._userData.getValue()?.Token ?? null;
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
