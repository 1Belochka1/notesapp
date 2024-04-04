import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { appRoutesConfig } from '../routes/app-routes.config';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((loggedIn) => {
      if (loggedIn) {
        if (route.routeConfig?.path == appRoutesConfig.mainLayout.path) {
          return true;
        }
        return router.createUrlTree([appRoutesConfig.mainLayout.path]);
      } else {
        if (
          route.routeConfig?.path == appRoutesConfig.auth.path ||
          route.routeConfig?.path == appRoutesConfig.register.path
        ) {
          return true;
        }

        return router.createUrlTree([appRoutesConfig.auth.path]);
      }
    })
  );
};
