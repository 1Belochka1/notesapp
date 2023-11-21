import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiUrls } from './api-urls';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	id: string;
	token: string;
	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private router: Router
	) {
		this.token = this.authService.getUserToken();
	}

	getProfile(): Observable<{
		login: string;
		firstName: string;
		lastName: string;
		email: string;
	}> {
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', 'Bearer ' + this.token);

		return this.http.get<{
			login: string;
			firstName: string;
			lastName: string;
			email: string;
		}>(apiUrls.profile.get, {
			headers: headers,
		});
	}
}
