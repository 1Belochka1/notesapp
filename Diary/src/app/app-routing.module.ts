import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { MainComponent } from './component/main/main.component';
import { RegisterComponent } from './component/register/register.component';
import { authGuard } from './guards/auth.guard';
import { appRoutes } from './routes/appRoutes';

const routes: Routes = [
	{
		path: appRoutes.auth.path,
		title: appRoutes.auth.title,
		component: AuthComponent,
		canActivate: [authGuard],
	},
	{
		path: appRoutes.register.path,
		title: appRoutes.register.title,
		component: RegisterComponent,
		canActivate: [authGuard],
	},
	{
		path: appRoutes.main,
		component: MainComponent,
		loadChildren: () =>
			import('./component/main/main.module').then((m) => m.MainModule),
		canActivate: [authGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
