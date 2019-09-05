import { FormGroup } from '@angular/forms';

export function ComparePassword(password: string, confirmPassword: string) {
	return (formGroup: FormGroup) => {
		const newPassword = formGroup.controls[password];
		const newConfirmPassword = formGroup.controls[confirmPassword];

		if (newConfirmPassword.errors && !newConfirmPassword.errors.mustMatch) {
			// return if another validator has already found an error on the newConfirmPassword
			return;
		}

		// set error on newConfirmPassword if validation fails
		if (newPassword.value !== newConfirmPassword.value) {
			newConfirmPassword.setErrors({ comparePassword: true });
		} else {
			newConfirmPassword.setErrors(null);
		}
	}
}