import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mainRoutes } from 'src/app/routes/mainRoutes';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'notes',
	},
	{
		title: mainRoutes.notes.title,
		path: mainRoutes.notes.path,
		component: mainRoutes.notes.component,
	},
	{
		title: mainRoutes.noteEditor.title,
		path: mainRoutes.noteEditor.path,
		component: mainRoutes.noteEditor.component,
	},
	{
		title: mainRoutes.tags.title,
		path: mainRoutes.tags.path,
		component: mainRoutes.tags.component,
	},
	{
		title: mainRoutes.profile.title,
		path: mainRoutes.profile.path,
		component: mainRoutes.profile.component,
	},
	{
		title: mainRoutes.settings.title,
		path: mainRoutes.settings.path,
		component: mainRoutes.settings.component,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}
