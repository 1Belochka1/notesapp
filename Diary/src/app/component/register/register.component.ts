import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginExistsValidatorDirective } from 'src/app/validators/login-exist.validator';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	form = this.formBuilder.group(
		{
			login: [
				'',
				{
					validators: [
						Validators.required,
						Validators.minLength(5),
						Validators.maxLength(50),
					],
					asyncValidators: [this.loginExistValidator],
				},
			],
			password: [
				'',
				{
					validators: [
						Validators.required,
						Validators.minLength(5),
						Validators.maxLength(50),
					],
				},
			],
			confirmPassword: [
				'',
				{
					validators: [
						Validators.required,
						Validators.minLength(5),
						Validators.maxLength(50),
					],
				},
			],
			email: [
				'',
				{
					validators: [Validators.required, Validators.email],
				},
			],
			firstName: [
				'',
				{
					validators: [Validators.required],
				},
			],
			lastName: [
				'',
				{
					validators: [Validators.required],
				},
			],
		},
		{
			updateOn: 'blur',
		}
	);

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private loginExistValidator: LoginExistsValidatorDirective,
		private router: Router
	) {}

	register() {
		if (this.form.invalid) {
			return;
		}

		// Создаем объект запроса на регистрацию
		const request = {
			Login: this.form.value.login,
			Password: this.form.value.password,
			Email: this.form.value.email,
			FirstName: this.form.value.firstName,
			LastName: this.form.value.lastName,
		};

		// Вызываем метод регистрации из authService
		this.authService.register(request).subscribe({
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
