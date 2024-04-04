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

	constructor(private readonly cryptoService: CryptoService) {
		let isLocked = localStorage.getItem('isLocked');
		if (isLocked) {
			isLocked = this.cryptoService.decryptData(isLocked);
			this.isLocked.next(isLocked === 'true');
		}
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

	destroy() {
		clearTimeout(this.inactivityTimeout);
		this.isLocked.next(false);
	}
}
