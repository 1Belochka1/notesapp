import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from './api-urls';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class ExportService {
	constructor(
		private readonly http: HttpClient,
		private authService: AuthService
	) {}

	public async exportToPdf(noteId: string) {
		const token = this.authService.getUserToken();
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', 'Bearer ' + token);

		const subscription = this.http
			.get(apiUrls.note.export + '/' + noteId, {
				headers: headers,
				responseType: 'text',
			})
			.subscribe((file) => {
				const byteCharacters = atob(file);
				const byteNumbers = new Array(byteCharacters.length);
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				const byteArray = new Uint8Array(byteNumbers);
				const blob = new Blob([byteArray], { type: 'application/pdf' });

				const url = URL.createObjectURL(blob);

				const anchor = document.createElement('a');
				anchor.href = url;
				anchor.download = 'export.pdf';

				anchor.dispatchEvent(new MouseEvent('click'));

				URL.revokeObjectURL(url);
			});
	}

	exportHtml(content: any) {}
}
