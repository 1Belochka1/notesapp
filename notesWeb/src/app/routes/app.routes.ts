import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { appRoutesConfig } from './app-routes.config';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: appRoutesConfig.redirect.redirectTo,
  },
  {
    title: appRoutesConfig.auth.title,
    path: appRoutesConfig.auth.path,
    component: appRoutesConfig.auth.component,
    canActivate: [authGuard],
  },
  {
    title: appRoutesConfig.register.title,
    path: appRoutesConfig.register.path,
    component: appRoutesConfig.register.component,
    canActivate: [authGuard],
  },
  {
    path: appRoutesConfig.mainLayout.path,
    component: appRoutesConfig.mainLayout.component,
    children: appRoutesConfig.mainLayout.children,
    canActivate: [authGuard],
  },
];
