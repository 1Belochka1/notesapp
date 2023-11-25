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

import { NoteEditorComponent } from '../component/main/note-editor/note-editor.component';
import { NotesComponent } from '../component/main/notes/notes.component';
import { ProfileComponent } from '../component/main/profile/profile.component';
import { SettingsComponent } from '../component/main/settings/settings.component';
import { TagsComponent } from '../component/main/tags/tags.component';

export const mainRoutes = {
	notes: {
		title: 'Заметки',
		path: 'notes',
		component: NotesComponent,
	},
	noteEditor: {
		title: 'Заметка',
		path: 'note-editor/:id',
		component: NoteEditorComponent,
	},
	tags: {
		title: 'Теги',
		path: 'tags',
		component: TagsComponent,
	},
	profile: {
		title: 'Профиль',
		path: 'profile',
		component: ProfileComponent,
	},
	settings: {
		title: 'Настройки',
		path: 'settings',
		component: SettingsComponent,
	},
};
