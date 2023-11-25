import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { INotes } from '../models/notes';
import { apiUrls } from './api-urls';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class NoteService {
	private hubConnection: HubConnection;

	private currentNote: Subject<INotes> = new Subject<INotes>();

	private notes: BehaviorSubject<INotes[]> = new BehaviorSubject<INotes[]>([]);

	constructor(private authService: AuthService) {}

	public createConnection() {
		const token = this.authService.getUserToken();
		this.hubConnection = new HubConnectionBuilder()
			.withUrl(apiUrls.note.socket, {
				accessTokenFactory: () => token,
			})
			.withAutomaticReconnect()
			.build();

		this.hubConnection.serverTimeoutInMilliseconds = 1000000;

		this.hubConnection.on('AddNote', (data) => {
			const notes = this.notes.getValue();
			notes.push(data);
			this.notes.next(notes);
		});

		this.hubConnection.on('UpdateNote', (data) => {
			const notes = this.notes.getValue();
			const index = notes.findIndex((v) => v.id == data.id);

			notes[index] = data;
			this.notes.next(notes);
			// this.updateNoteSubject.next(data);
		});

		this.hubConnection.on('DeleteNote', (data) => {
			const notes = this.notes.getValue();
			this.notes.next(notes.filter((v) => v.id != data.id));

			// this.deleteNoteSubject.next(data);
		});

		this.hubConnection.on('GetNotes', (data: INotes[]) => {
			data.forEach((element) => {
				element.createDate = new Date(element.createDate);
			});
			this.notes.next(data);
		});

		console.log(token);
	}

	public startConnection() {
		this.hubConnection
			.start()
			.then(() => this.hubConnection.send('GetNotes'))
			.catch((e) => console.log(e));
	}

	public notes$(): Observable<INotes[]> {
		return this.notes.asObservable();
	}

	public getAllNotes() {
		this.hubConnection.send('GetNotes');
	}

	public onDestroy() {
		this.hubConnection.stop();
		this.notes.next(new Array<INotes>());
	}
}
