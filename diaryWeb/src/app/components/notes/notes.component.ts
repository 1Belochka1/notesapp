import { DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INote } from '../../models/note';
import { StripHtmlTagsPipe } from '../../pipe/StripHtmlTagsPipe';
import { mainLayoutRoutesConfig } from '../../routes/main-layout-routes.config';
import { ContentService } from '../../services/content.service';
import { NotesService } from '../../services/notes.service';
import { SvgTagsComponent } from '../svg/tags/svg-tags.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    JsonPipe,
    DatePipe,
    StripHtmlTagsPipe,
    SvgTagsComponent,
  ],
  providers: [ContentService],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnDestroy {
  notes: INote[];
  notesSubscription: Subscription;

  constructor(private _notesService: NotesService, private _router: Router) {
    this.notesSubscription = this._notesService.notes$().subscribe((notes) => {
      this.notes = notes.sort(
        (a, b) => b.createDate.getTime() - a.createDate.getTime()
      );
    });
  }

  createNote() {
    this._notesService.createNote();
  }

  navigateToNote(id: string) {
    this._router.navigate([mainLayoutRoutesConfig.noteEditor.path, id]);
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }
}
