import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';
import { CustomInputComponent } from '../ui/custom-input/custom-input.component';

@Component({
	selector: 'app-modal-update-tag',
	standalone: true,
	imports: [ModalLayoutComponent, ReactiveFormsModule, CustomInputComponent],
	templateUrl: './modal-update-tag.component.html',
	styleUrl: './modal-update-tag.component.scss',
})
export class ModalUpdateTagComponent {
	@Output()
	update: EventEmitter<string> = new EventEmitter<string>();

	@Output()
	cancel: EventEmitter<void> = new EventEmitter<void>();

	@Input()
	tagName: string = '';

	newTagNameControl: FormControl = new FormControl(this.tagName, {
		validators: [Validators.required],
	});

	clickLayout(ev: MouseEvent) {
		if ((ev.target as HTMLElement).localName == 'app-modal-layout') {
			this.cancel.emit();
		}
	}

	cancelClick = () => this.cancel.emit();

	updateClick = () => this.update.emit(this.newTagNameControl.value);
}
