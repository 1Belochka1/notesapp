import { Directive } from '@angular/core';
import {
	AbstractControl,
	AsyncValidator,
	NG_ASYNC_VALIDATORS,
	ValidationErrors,
} from '@angular/forms';
import { Observable, map, switchMap, timer } from 'rxjs';

import { forwardRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
	selector: '[appLoginExistsValidator]',
	providers: [
		{
			provide: NG_ASYNC_VALIDATORS,
			useExisting: forwardRef(() => LoginExistsValidatorDirective),
			multi: true,
		},
	],
})
export class LoginExistsValidatorDirective implements AsyncValidator {
	constructor(private api: AuthService) {}

	validate(control: AbstractControl): Observable<ValidationErrors | null> {
		// return this.api.isLoginExist(control.value).pipe(
		// 	delay(1000),
		// 	map((res) => (res ? { loginExists: true } : null))
		// );

		return timer(1000).pipe(
			switchMap(() =>
				this.api
					.isLoginExist(control.value)
					.pipe(map((res) => (res ? { loginExists: true } : null)))
			)
		);
	}
}
