import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
	imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
