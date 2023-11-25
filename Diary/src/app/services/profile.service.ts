import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from './api-urls';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	constructor(private http: HttpClient, private authService: AuthService) {}

	getProfile(): Observable<{
		login: string;
		firstName: string;
		lastName: string;
		email: string;
	}> {
		const token = this.authService.getUserToken();
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', 'Bearer ' + token);

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
