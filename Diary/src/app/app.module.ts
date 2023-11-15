import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { CustomInputComponent } from './component/custom-input/custom-input.component';
import { MainModule } from './component/main/main.module';
import { RegisterComponent } from './component/register/register.component';
import { UserService } from './services/user.service';
import { LoginExistsValidatorDirective } from './validators/login-exist.validator';

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		RegisterComponent,
		CustomInputComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MainModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [UserService, LoginExistsValidatorDirective],
	bootstrap: [AppComponent],
})
export class AppModule {}
