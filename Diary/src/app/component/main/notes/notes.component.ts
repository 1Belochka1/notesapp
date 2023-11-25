import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INotes } from 'src/app/models/notes';
import { NoteService } from 'src/app/services/note.service';
import { nameOfMonths } from '../note-editor/nameOfMonths';

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {
	notesSubscription: Subscription;

	notes: INotes[] = [];

	constructor(private noteService: NoteService) {
		this.noteService.createConnection();
		this.noteService.startConnection();

		this.notesSubscription = this.noteService.notes$().subscribe((data) => {
			console.log(data);
			this.notes = data.sort(
				(a, b) => b.createDate.getTime() - a.createDate.getTime()
			);
		});
	}

	public getDateTime(createDate: Date): string {
		return `${createDate.getDate()} ${nameOfMonths[createDate.getMonth()]} ${
			createDate.getHours() < 10
				? '0' + createDate.getHours()
				: createDate.getHours()
		}:${
			createDate.getSeconds() < 10
				? '0' + createDate.getSeconds()
				: createDate.getSeconds()
		}`;
	}

	ngOnDestroy(): void {
		console.log('destroy');
		this.notesSubscription.unsubscribe();
		this.noteService.onDestroy();
	}

	ngOnInit(): void {}
}
