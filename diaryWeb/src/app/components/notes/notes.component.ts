import {DatePipe, JsonPipe, NgFor, NgIf} from '@angular/common';
import {Component, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {INote} from '../../models/note';
import {StripHtmlTagsPipe} from '../../pipe/StripHtmlTagsPipe';
import {mainLayoutRoutesConfig} from '../../routes/main-layout-routes.config';
import {ContentService} from '../../services/content.service';
import {NotesService} from '../../services/notes.service';
import {SvgTagsComponent} from '../svg/tags/svg-tags.component';
import {AnimationOptions, LottieComponent} from "ngx-lottie";

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
		FormsModule,
		LottieComponent
	],
	providers: [ContentService],
	templateUrl: './notes.component.html',
	styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnDestroy {
	notes: INote[];
	viewNotes: INote[];
	searchText: string = '';
	notesSubscription: Subscription;
	loadingSubscription: Subscription;

	loading: boolean = false;

	lottieLoader: AnimationOptions = {
		path: 'assets/loader.json',
	}

	constructor(private _notesService: NotesService, private _router: Router) {
		this.notesSubscription = this._notesService.notes$().subscribe((notes) => {
			this.notes = notes;
			this.searchInput();
		});
		this.loadingSubscription = this._notesService.isLoading$().subscribe((isLoading) => {
			this.loading = isLoading;
		})
	}

	searchInput = () => {
		this.viewNotes =
			this.searchText.length < 1
				? this.notes
				: this.notes.filter((n) => {
					const div = document.createElement('div');
					div.innerHTML = n.content;
					return (div.textContent || div.innerText || '')
						.toLowerCase()
						.includes(this.searchText.toLowerCase());
				});
	};

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
