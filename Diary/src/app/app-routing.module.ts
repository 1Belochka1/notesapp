import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './component/calendar/calendar.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'calendar' },
	{ title: 'Календарь', path: 'calendar', component: CalendarComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
