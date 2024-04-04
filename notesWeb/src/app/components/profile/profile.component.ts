import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CryptoService } from '../../services/crypto.service';
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
		private cryptoService: CryptoService
	) {}

	isPinCode: boolean = false;
	newPinCode: string = '';
	pinCode: string = '';
	ngOnInit(): void {
		this.profileService.getProfile().subscribe((val) => {
			this.profile = val;
		});
		this.isPinCode = localStorage.getItem('pinCode') ? true : false;
	}

	logout(): void {
		this.authService.logout();
	}
	updatePinCode(): void {
		if (this.isPinCode) {
			const localStoragePinCode = this.cryptoService.decryptData(
				localStorage.getItem('pinCode')!
			);
			if (localStoragePinCode === this.pinCode) {
				localStorage.setItem(
					'pinCode',
					this.cryptoService.encryptData(this.newPinCode)
				);
			}
		} else {
			localStorage.setItem(
				'pinCode',
				this.cryptoService.encryptData(this.pinCode)
			);
			this.isPinCode = !this.isPinCode;
		}
	}

	validateNumericInput(event: any) {
		const numericRegex = /^[0-9]*$/; // regular expression to match only numeric characters
		if (!numericRegex.test(event.target.value)) {
			event.target.value = event.target.value.replace(/\D/g, ''); // remove non-numeric characters
		}
	}
}
