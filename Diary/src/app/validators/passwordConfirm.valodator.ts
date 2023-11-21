import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordConfirmValidator: ValidatorFn = (
	group: AbstractControl
): ValidationErrors | null => {
	const password = group.get('password');
	const confirmPassword = group.get('confirmPassword');

	if (password == null || confirmPassword == null) return null;

	if (password?.errors || confirmPassword?.errors) return null;

	if (password?.value === confirmPassword?.value) return null;

	return { noConfirmPassword: true };
};
