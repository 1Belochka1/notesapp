import { inject } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { appRoutes } from '../routes/appRoutes';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.isLoggedIn().pipe(
		map((loggedIn) => {
			console.log(loggedIn);
			if (loggedIn) {
				if (route.routeConfig?.path == appRoutes.main) {
					return true;
				}
				return router.createUrlTree([appRoutes.main]);
			} else {
				if (
					route.routeConfig?.path == appRoutes.auth.path ||
					route.routeConfig?.path == appRoutes.register.path
				) {
					return true;
				}

				return router.createUrlTree([appRoutes.auth.path]);
			}
		})
	);
};
