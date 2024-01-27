import { AsyncPipe, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { passwordConfirmValidator } from '../../validators/passwordConfirm.validator';
import { CustomInputComponent } from '../ui/custom-input/custom-input.component';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		CustomInputComponent,
		ReactiveFormsModule,
		RouterLink,
		FormsModule,
		NgIf,
		AsyncPipe,
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
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
			validators: [passwordConfirmValidator],
			updateOn: 'submit',
		}
	);

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {}

	registerSubscription: Subscription;
	error: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
		null
	);

	register() {
		if (this.form.invalid) {
			return;
		}

		// Создаем объект запроса на регистрацию
		const request = {
			Login: this.form.value.login,
			Password: this.form.value.password,
			ConfirmPassword: this.form.value.confirmPassword,
			Email: this.form.value.email,
			FirstName: this.form.value.firstName,
			LastName: this.form.value.lastName,
		};

		// Вызываем метод регистрации из authService
		this.registerSubscription = this.authService.register(request).subscribe({
			next: () => {
				this.router.navigate(['/']);
			},
			error: (err: HttpErrorResponse) => {
				// Обработать ошибку
				console.log(err);
				this.error.next(err.error);
			},
		});
	}

	ngOnDestroy(): void {
		if (this.registerSubscription) this.registerSubscription.unsubscribe();
	}
}
