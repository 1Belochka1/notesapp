import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { appRoutes } from './routes/app.routes';
import { AuthService } from './services/auth.service';
import { CryptoService } from './services/crypto.service';
registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    AuthService,
    CryptoService,
    { provide: LOCALE_ID, useValue: 'ru-RU' },
  ],
};
