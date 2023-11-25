import { mainRoutes } from 'src/app/routes/mainRoutes';

export const menuRoutes = [
	{
		title: mainRoutes.notes.title,
		path: mainRoutes.notes.path,
		component: mainRoutes.notes.component,
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
