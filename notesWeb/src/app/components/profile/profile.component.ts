import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { InactivityService } from '../../services/inactivity.service';
import { ProfileService } from '../../services/profile.service';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [NgIf, FormsModule],
	providers: [ProfileService],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
	profile: any;
	constructor(
		private profileService: ProfileService,
		private authService: AuthService,
		private inactiveService: InactivityService
	) {}

	isPinCode: boolean = false;
	newPinCode: string = '';
	pinCode: string = '';

	errorPinCode: string = '';

	ngOnInit(): void {
		this.profileService.getProfile().subscribe((val) => {
			this.profile = val;
		});
		this.inactiveService.isPinCode.subscribe((v) => {
			this.isPinCode = v;
		});
	}

	logout(): void {
		this.authService.logout();
	}
	updatePinCode(): void {
		const res = this.inactiveService.updatePinCode(
			this.pinCode,
			this.newPinCode
		);

		this.errorPinCode = res ? '' : 'Неверный пин-код';
	}

	setPinCode() {
		this.inactiveService.setPinCode(this.pinCode);
	}

	deletePinCode() {
		const res = this.inactiveService.removePinCode(this.pinCode);

		this.errorPinCode = res ? '' : 'Неверный пин-код';
	}

	validateNumericInput(event: any) {
		const numericRegex = /^[0-9]*$/; // regular expression to match only numeric characters
		if (!numericRegex.test(event.target.value)) {
			event.target.value = event.target.value.replace(/\D/g, ''); // remove non-numeric characters
		}
	}
}
