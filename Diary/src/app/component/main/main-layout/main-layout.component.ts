import { Component } from '@angular/core';
import { mainRoutes } from 'src/app/routes/mainRoutes';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
	shortMenu: boolean = true;

	routes = mainRoutes;

	toggleMenu() {
		this.shortMenu = !this.shortMenu;
	}
}
