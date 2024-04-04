import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeEvent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

import Editor from 'ckeditor5-custom-build';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { INote } from '../../models/note';
import { mainLayoutRoutesConfig } from '../../routes/main-layout-routes.config';
import { ContentService } from '../../services/content.service';
import { ExportService } from '../../services/export.service';
import { NoteEditorService } from '../../services/note-editor.service';
import { ModalAddTagsComponent } from '../modal-add-tags/modal-add-tags.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalNoteTagsComponent } from '../modal-note-tags/modal-note-tags.component';
import { SvgTagsComponent } from '../svg/tags/svg-tags.component';
import { ckeditorConfig } from './ckeditor.config';

@Component({
	selector: 'app-note-editor',
	standalone: true,
	imports: [
		CKEditorModule,
		FormsModule,
		SvgTagsComponent,
		ModalNoteTagsComponent,
		ModalAddTagsComponent,
		ModalConfirmComponent,
		NgFor,
		NgIf,
	],
	providers: [NoteEditorService, ContentService, ExportService],
	templateUrl: './note-editor.component.html',
	styleUrl: './note-editor.component.scss',
})
export class NoteEditorComponent implements OnInit, OnDestroy {
	note: INote;
	isOpenModalNoteTags: boolean = false;
	isOpenModalAddTags: boolean = false;
	isOpenModalConfirm: boolean = false;
	content = '';
	editor = Editor;
	config: EditorConfig = ckeditorConfig;
	private _updateNoteSubject = new Subject<null>();
	private _noteSubscription: Subscription;
	private _noteUpdateSubscription: Subscription;

	constructor(
		private _noteEditorService: NoteEditorService,
		private _exportService: ExportService,
		private _contentService: ContentService,
		private _router: Router
	) {
		_noteEditorService.createConnection();
		this._noteSubscription = _noteEditorService.note$().subscribe((note) => {
			this.note = note;
			this.content = note.content;
		});
	}

	exportToPdf = () => {
		this._exportService.exportToPdf(this.note.id);
	};

	change = (ev: ChangeEvent) => this._updateNoteSubject.next(null);

	addTag = (tagId: string) => this._noteEditorService.addTag(tagId);

	deleteTag = (tagId: string) => this._noteEditorService.deleteTag(tagId);

	deleteNote() {
		this._noteEditorService.deleteNote();
		this.isOpenModalConfirm = false;
		this._router.navigate([mainLayoutRoutesConfig.notes.path]);
	}

	ngOnInit(): void {
		this._noteUpdateSubscription = this._updateNoteSubject
			.pipe(debounceTime(800))
			.subscribe(() => {
				this._noteEditorService.updateNote(this.content);
			});
	}

	ngOnDestroy(): void {
		this._noteUpdateSubscription.unsubscribe();
		this._noteSubscription.unsubscribe();
		this._noteEditorService.destroy();
	}
}
