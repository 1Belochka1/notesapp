import { Component, EventEmitter, Output } from '@angular/core';
import { SvgCloseComponent } from '../svg/close/svg-close.component';

@Component({
	selector: 'app-modal-layout',
	standalone: true,
	imports: [SvgCloseComponent],
	templateUrl: './modal-layout.component.html',
	styleUrl: './modal-layout.component.scss',
})
export class ModalLayoutComponent {
	@Output()
	closeClick: EventEmitter<void> = new EventEmitter<void>();
}
