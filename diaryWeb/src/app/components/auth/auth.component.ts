import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CustomInputComponent } from '../ui/custom-input/custom-input.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CustomInputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginSubscription: Subscription;

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
      error: (err) => {
        // Обработать ошибку
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) this.loginSubscription.unsubscribe();
  }
}
