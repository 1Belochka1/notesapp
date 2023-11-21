import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Error401Interceptor } from 'src/app/interceptors/401error.Interceptor';
import { NoteService } from 'src/app/services/note.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NotesComponent } from './notes/notes.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
	declarations: [
		MainComponent,
		NotesComponent,
		ProfileComponent,
		TagsComponent,
		SettingsComponent,
		MainLayoutComponent,
	],
	imports: [CommonModule, MainRoutingModule, HttpClientModule],
	providers: [
		ProfileService,
		NoteService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: Error401Interceptor,
			multi: true,
		},
	],
})
export class MainModule {}
