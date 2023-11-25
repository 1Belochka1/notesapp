import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { RegisterComponent } from './component/register/register.component';
import { CustomInputComponent } from './component/ui/custom-input/custom-input.component';
import { AuthService } from './services/auth.service';
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
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [AuthService, LoginExistsValidatorDirective],
	bootstrap: [AppComponent],
})
export class AppModule {}
