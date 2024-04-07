import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { CryptoService } from './crypto.service';

@Injectable({
	providedIn: 'root',
})
export class InactivityService {
	private inactivityTimeout: any;
	private readonly inactivityDuration = 3000; // 5 minutes

	private readonly isLocked: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);

	public isPinCode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	constructor(private readonly cryptoService: CryptoService) {
		let isLocked = localStorage.getItem('isLocked');
		if (isLocked) {
			isLocked = this.cryptoService.decryptData(isLocked);
			this.isLocked.next(isLocked === 'true');
		}
		let isPinCode = localStorage.getItem('pinCode');
		if (isPinCode) this.isPinCode.next(true);
	}

	resetTimer() {
		if (localStorage.getItem('pinCode')) {
			clearTimeout(this.inactivityTimeout);
			this.inactivityTimeout = setTimeout(() => {
				this.lockScreen();
			}, this.inactivityDuration);
		}
	}

	lockScreen() {
		this.isLocked.next(true);
	}

	updatePinCode(pinCode: string, newPinCode: string) {
		const localStoragePinCode = this.cryptoService.decryptData(
			localStorage.getItem('pinCode')!
		);
		if (localStoragePinCode === pinCode) {
			localStorage.setItem(
				'pinCode',
				this.cryptoService.encryptData(newPinCode)
			);
			this.resetTimer();
			return true;
		}
		return false;
	}

	setPinCode(pinCode: string) {
		localStorage.setItem('pinCode', this.cryptoService.encryptData(pinCode));
		this.isPinCode.next(true);
		this.resetTimer();
	}

	unlockScreen(pinCode: string): boolean {
		const storagePinCode = localStorage.getItem('pinCode');
		if (!storagePinCode) {
			return false;
		}
		const pinCodeUser = this.cryptoService.decryptData(storagePinCode);
		if (pinCodeUser && pinCode.toString() === pinCodeUser) {
			this.isLocked.next(false);
			this.resetTimer();
			return true;
		}
		return false;
	}

	isLockedScreen() {
		return this.isLocked
			.asObservable()
			.pipe(
				tap((value) =>
					localStorage.setItem(
						'isLocked',
						this.cryptoService.encryptData(value.toString())
					)
				)
			);
	}

	removePinCode(pinCode: string) {
		const storagePinCode = localStorage.getItem('pinCode');
		if (!storagePinCode) {
			return true;
		}
		const pinCodeUser = this.cryptoService.decryptData(storagePinCode);
		if (pinCodeUser && pinCode.toString() === pinCodeUser) {
			localStorage.removeItem('pinCode');
			localStorage.removeItem('isLocked');
			clearTimeout(this.inactivityTimeout);
			this.isPinCode.next(false);
			return true;
		}
		return false;
	}

	destroy() {
		clearTimeout(this.inactivityTimeout);
		this.isLocked.next(false);
	}
}
