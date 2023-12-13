import { AuthComponent } from '../components/auth/auth.component';
import { MainLayoutComponent } from '../components/main-layout/main-layout.component';
import { RegisterComponent } from '../components/register/register.component';
import { mainLayoutRoutesConfig } from './main-layout-routes.config';
import { mainLayoutRoutes } from './main-layout.routes';

export const appRoutesConfig = {
  auth: {
    title: 'Авторизация',
    path: 'auth',
    component: AuthComponent,
  },
  register: {
    title: 'Регистрация',
    path: 'register',
    component: RegisterComponent,
  },
  mainLayout: {
    path: '',
    component: MainLayoutComponent,
    children: mainLayoutRoutes,
  },
  redirect: {
    redirectTo: '/' + mainLayoutRoutesConfig.notes.path,
  },
};
