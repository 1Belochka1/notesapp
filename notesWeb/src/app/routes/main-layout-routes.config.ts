import { NoteEditorComponent } from '../components/note-editor/note-editor.component';
import { NotesComponent } from '../components/notes/notes.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { TagComponent } from '../components/tag/tag.component';
import { TagsComponent } from '../components/tags/tags.component';

export const mainLayoutRoutesConfig = {
  notes: {
    title: 'Заметки',
    path: 'notes',
    component: NotesComponent,
  },
  noteEditor: {
    title: 'Заметка',
    path: 'note-editor',
    component: NoteEditorComponent,
  },
  tag: {
    title: 'Тег',
    path: 'tag',
    component: TagComponent,
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
};
