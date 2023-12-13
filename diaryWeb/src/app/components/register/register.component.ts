import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordConfirmValidator } from '../../validators/passwordConfirm.validator';
import { CustomInputComponent } from '../ui/custom-input/custom-input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CustomInputComponent, ReactiveFormsModule, RouterLink],
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
      updateOn: 'blur',
    }
  );

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form.valueChanges.subscribe((data) => {
      console.log(this.form);
    });
  }
}
