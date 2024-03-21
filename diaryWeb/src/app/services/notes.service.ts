import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {INote} from '../models/note';
import {ITag} from '../models/tag';
import {mainLayoutRoutesConfig} from '../routes/main-layout-routes.config';
import {apiUrls} from './api-urls';
import {AuthService} from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class NotesService {
	private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	)

	private _hubConnection: HubConnection;

	private _notes: BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);

	constructor(private _authService: AuthService, private _router: Router) {
		this.createConnection();
		this.startConnection();
	}

	public createConnection() {
		const token = this._authService.getUserToken();
		this._hubConnection = new HubConnectionBuilder()
			// .configureLogging(LogLevel.None)
			.withUrl(apiUrls.socket.notes, {
				accessTokenFactory: () => token,
			})
			.withAutomaticReconnect()
			.build();

		this._hubConnection.serverTimeoutInMilliseconds = 600000;

		this._hubConnection.on('GetNotes', (data: INote[]) => {
			this._isLoading.next(false);
			data.forEach((element) => {
				element.createDate = new Date(element.createDate);
			});
			this._notes.next(data);
		});

		this._hubConnection.on('CreateNote', (note: INote) => {
			this._router.navigate([mainLayoutRoutesConfig.noteEditor.path, note.id]);
		});

		this._hubConnection.on('UpdateNoteInNotes', (note) => {
			note.createDate = new Date(note.createDate);
			const notes = this._notes.getValue().filter((n) => n.id != note.id);
			notes.push(note);
			this._notes.next(notes);
		});

		this._hubConnection.on('DeleteNoteInNotes', (note) => {
			const notes = this._notes.getValue().filter((n) => n.id != note.id);
			this._notes.next(notes);
		});

		this._hubConnection.on('DeleteTag', (tag: ITag) => {
			let notes = this._notes.getValue();
			notes = notes.map((n) => {
				return {...n, tags: n.tags.filter((t) => t.id !== tag.id)};
			});
			this._notes.next(notes);
		});
	}

	public startConnection() {
		this._hubConnection
			.start()
			.then(() => this._isLoading.next(true))
			.then(() => this._hubConnection.send('GetNotes'))
			.catch((e) => console.log(e));
	}

	public createNote() {
		this._hubConnection.send('CreateNote', {content: ''});
	}

	public notes$(): Observable<INote[]> {
		return this._notes
			.asObservable()
			.pipe(
				map((notes) =>
					notes.sort((a, b) => b.createDate.getTime() - a.createDate.getTime())
				)
			);
	}

	public isLoading$(): Observable<boolean> {
		return this._isLoading.asObservable();
	}
}
