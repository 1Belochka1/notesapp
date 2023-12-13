import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITag } from '../models/tag';
import { apiUrls } from './api-urls';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private _hubConnection: HubConnection;

  private _tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);

  private _search: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private authService: AuthService) {}

  public createConnection() {
    const token = this.authService.getUserToken();
    this._hubConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(apiUrls.socket.tags, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    this._hubConnection.serverTimeoutInMilliseconds = 600000;

    this._hubConnection.on('GetTags', (tags: ITag[]) => {
      this._tags.next(tags);
    });

    this._hubConnection.on('CreateTag', (tag: ITag) => {
      const tags = this._tags.getValue();

      if (this._search.getValue() !== null) {
        if (tag.name.includes(this._search.getValue()!)) {
          tags.push(tag);
          this._tags.next(tags);
        }
      } else {
        tags.push(tag);
        this._tags.next(tags);
      }
    });

    this._hubConnection.on('DeleteTag', (tag: ITag) => {
      let tags = this._tags.getValue();

      if (this._search.getValue() !== null) {
        if (tag.name.includes(this._search.getValue()!)) {
          tags = tags.filter((t) => t.id != tag.id);
          this._tags.next(tags);
        }
      } else {
        tags = tags.filter((t) => t.id != tag.id);
        this._tags.next(tags);
      }
    });

    this._hubConnection
      .start()
      .then(() => {
        this._hubConnection.send('GetTags', this._search.getValue());
      })
      .catch((e) => console.log(e));
  }

  public createTag(name: string) {
    this._hubConnection.send('CreateTag', name);
  }

  public updateTag() {}

  public deleteTag(id: string) {
    this._hubConnection.send('DeleteTag', id);
  }

  public tags$(): Observable<ITag[]> {
    return this._tags.asObservable();
  }
}
