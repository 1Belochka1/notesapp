import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mainRoutes } from 'src/app/routes/mainRoutes';

@NgModule({
	imports: [RouterModule.forChild(mainRoutes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}
