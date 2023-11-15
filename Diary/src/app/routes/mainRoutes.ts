// export const mainRoutes = {
// 	notes: {
// 		title: 'Заметки',
// 		path: 'notes',
// 	},
// 	profile: {
// 		title: 'Профиль',
// 		path: 'profile',
// 	},
// };

import { Routes } from '@angular/router';
import { NotesComponent } from '../component/main/notes/notes.component';
import { ProfileComponent } from '../component/main/profile/profile.component';
import { SettingsComponent } from '../component/main/settings/settings.component';
import { TagsComponent } from '../component/main/tags/tags.component';

export const mainRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'notes',
	},
	{
		title: 'Заметки',
		path: 'notes',
		component: NotesComponent,
	},
	{
		title: 'Теги',
		path: 'tags',
		component: TagsComponent,
	},
	{
		title: 'Профиль',
		path: 'profile',
		component: ProfileComponent,
	},
	{
		title: 'Настройки',
		path: 'settings',
		component: SettingsComponent,
	},
];
