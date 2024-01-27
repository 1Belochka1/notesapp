import { NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { InactivityService } from '../../services/inactivity.service';
import { NotesService } from '../../services/notes.service';
import { LockScreenComponent } from '../lock-screen/lock-screen.component';
import { SvgArrowComponent } from '../svg/arrow/svg-arrow.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
	selector: 'app-main-layout',
	standalone: true,
	imports: [
		RouterOutlet,
		NgComponentOutlet,
		RouterLink,
		NgFor,
		NgIf,
		SvgArrowComponent,
		NavbarComponent,
		LockScreenComponent,
	],
	providers: [NotesService],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
	private isLockedSubscription: Subscription;
	constructor(private inactivityService: InactivityService) {}

	isLocked = false;

	ngOnInit() {
		this.isLockedSubscription = this.inactivityService
			.isLockedScreen()
			.subscribe((isLocked) => {
				this.isLocked = isLocked;
			});
		this.resetInactivityTimer();
	}

	ngOnDestroy(): void {
		this.isLockedSubscription.unsubscribe();
		this.inactivityService.destroy();
	}

	resetInactivityTimer() {
		this.inactivityService.resetTimer();
	}

	// Добавьте обработчики событий для сброса таймера бездействия
	onUserActivity() {
		this.resetInactivityTimer();
	}
}
