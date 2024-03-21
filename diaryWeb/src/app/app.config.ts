import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';

import {registerLocaleData} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import {appRoutes} from './routes/app.routes';
import {AuthService} from './services/auth.service';
import {CryptoService} from './services/crypto.service';
import {provideLottieOptions} from "ngx-lottie";
import player from 'lottie-web';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(appRoutes),
		provideHttpClient(),
		AuthService,
		CryptoService,
		{provide: LOCALE_ID, useValue: 'ru-RU'},
		provideLottieOptions({
			player: () => player,
		})
	],
};
