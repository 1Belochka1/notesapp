import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InactivityService } from '../../services/inactivity.service';

@Component({
	selector: 'app-lock-screen',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './lock-screen.component.html',
	styleUrl: './lock-screen.component.scss',
})
export class LockScreenComponent {
	constructor(private inactivityService: InactivityService) {}

	pinCode: string = '';

	validateNumericInput(event: any) {
		const numericRegex = /^[0-9]*$/; // regular expression to match only numeric characters
		if (!numericRegex.test(event.target.value)) {
			event.target.value = event.target.value.replace(/\D/g, ''); // remove non-numeric characters
		}
	}

	unlock() {
		const idUnlocked = this.inactivityService.unlockScreen(this.pinCode);
	}
}
