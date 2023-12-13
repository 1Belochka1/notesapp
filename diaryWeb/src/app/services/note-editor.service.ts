import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { INote } from '../models/note';
import { apiUrls } from './api-urls';
import { AuthService } from './auth.service';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root',
})
export class NoteEditorService {
  private _hubConnection: HubConnection;
  private _note: Subject<INote> = new Subject<INote>();
  private _noteId: string;
  private _notUpdate: boolean = true;

  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _contentService: ContentService
  ) {
    this._noteId = _route.snapshot.paramMap.get('id')!;
  }

  public createConnection() {
    const token = this._authService.getUserToken();
    console.log(token);
    this._hubConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(apiUrls.socket.noteEditor, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this._hubConnection.serverTimeoutInMilliseconds = 600000;

    this._hubConnection.on('GetNote', (note) => {
      this._note.next(note);
    });

    this._hubConnection.on('UpdateNote', ([note, flag]) => {
      this._notUpdate = flag;
      this._note.next(note);
    });

    this._hubConnection.on('DeleteNote', () => {
      this.destroy();
    });

    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection.send('JoinGroup', this._noteId);
        this._hubConnection.send('GetNote', this._noteId);
      })
      .catch((e) => console.log(e));
  }

  public updateNote(content: string) {
    if (this._notUpdate) {
      const title = this._contentService.getTitle(content);
      this._hubConnection.send('UpdateNote', {
        NoteId: this._noteId,
        Name: title,
        Content: content,
      });
    }
    this._notUpdate = true;
  }

  public deleteNote() {
    this._hubConnection.send('DeleteNote', this._noteId);
  }

  public addTag(tagId: string) {
    this._hubConnection.send('AddTagInNoteByNoteId', this._noteId, tagId);
  }

  public deleteTag(tagId: string) {
    this._hubConnection.send('DeleteTagInNoteByNoteId', this._noteId, tagId);
  }

  public note$(): Observable<INote> {
    return this._note.asObservable();
  }

  public destroy() {
    this._hubConnection.send('LeaveGroup', this._noteId);
    this._hubConnection.stop();
  }
}
