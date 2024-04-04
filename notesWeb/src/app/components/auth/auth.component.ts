import { AsyncPipe, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CustomInputComponent } from '../ui/custom-input/custom-input.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CustomInputComponent,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginSubscription: Subscription;
  error: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );

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
    this.loginSubscription = this.authService.login(request).subscribe({
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
    if (this.loginSubscription) this.loginSubscription.unsubscribe();
  }
}
