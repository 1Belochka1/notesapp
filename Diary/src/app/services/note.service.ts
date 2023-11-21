import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { apiUrls } from './api-urls';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class NoteService {
	private hubConnection: HubConnection;

	private dataSubject: Subject<any> = new Subject<any>();

	private notes: Subject<any> = new Subject<any>();

	token: string;

	constructor(private authService: AuthService) {
		this.token = this.authService.getUserToken();
	}

	public startConnection() {
		const userId = this.authService.getUserLogin();

		this.hubConnection = new HubConnectionBuilder()
			.withUrl(apiUrls.note.socket, {
				accessTokenFactory: () => this.token,
			})
			.withAutomaticReconnect()
			.build();

		this.hubConnection.on('AddNote', (data) => {
			console.log(data);
			this.dataSubject.next(data);
		});

		this.hubConnection.on('GetNotes', (data) => {
			console.log(data);
			this.notes.next(data);
		});

		this.hubConnection
			.start()
			.then(() => this.hubConnection.send('GetNotes'))
			.catch((e) => console.log(e));
	}

	public notesUpdateListener(): Observable<any> {
		return this.dataSubject.asObservable();
	}

	public getAllNotes(): Observable<any> {
		return this.notes.asObservable();
	}
}
