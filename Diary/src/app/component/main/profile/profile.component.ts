import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	profile: any;
	constructor(
		private profileService: ProfileService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.profileService.getProfile().subscribe((val) => {
			this.profile = val;
		});
	}

	logout(): void {
		this.authService.logout();
	}
}
