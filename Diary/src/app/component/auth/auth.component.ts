import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/routes/appRoutes';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
	registerPath: string = `/${appRoutes.register.path}`;

	form = this.formBuilder.group({
		login: [''],
		password: [''],
	});

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {}

	login() {
		if (this.form.invalid) {
			return;
		}

		// Создаем объект запроса на регистрацию
		const request = {
			Login: this.form.value.login,
			Password: this.form.value.password,
		};

		// Вызываем метод регистрации из authService
		this.authService.login(request).subscribe({
			next: () => {
				this.router.navigate(['/']);
			},
			error: (err) => {
				// Обработать ошибку
				console.log(err);
			},
		});
	}
}
