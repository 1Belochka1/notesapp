import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { INote } from '../models/note';
import { ITag } from '../models/tag';
import { apiUrls } from './api-urls';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private _hubConnection: HubConnection;
  private _notes: BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);
  private _tagId: string;

  constructor(
    private _route: ActivatedRoute,
    private authService: AuthService
  ) {
    this._tagId = _route.snapshot.paramMap.get('id')!;
  }

  public createConnection() {
    const token = this.authService.getUserToken();
    this._hubConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(apiUrls.socket.tag, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this._hubConnection.serverTimeoutInMilliseconds = 600000;

    this._hubConnection.on('GetNotesInTag', (notes: INote[]) => {
      this._notes.next(notes);
    });

    this._hubConnection.on('CreateTag', (tag: ITag) => {});

    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection.send('GetNotesInTag', this._tagId);
      })
      .catch((e) => console.log(e));
  }

  public notes() {
    return this._notes.asObservable();
  }
}
