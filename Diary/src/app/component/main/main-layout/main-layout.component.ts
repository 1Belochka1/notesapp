import { Component } from '@angular/core';
import { menuRoutes } from './menuRoutes';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
	shortMenu: boolean = true;

	routes = menuRoutes;

	toggleMenu() {
		this.shortMenu = !this.shortMenu;
	}
}
