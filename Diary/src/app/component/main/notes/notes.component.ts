import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
	notes: any[] = [];
	constructor(private noteService: NoteService) {}

	ngOnInit(): void {
		this.noteService.startConnection();
		this.noteService.getAllNotes().subscribe((data) => {
			console.log(data);
			this.notes = data;
		});
		this.noteService.notesUpdateListener().subscribe((data) => {
			this.notes.push(data);
		});
	}
}
