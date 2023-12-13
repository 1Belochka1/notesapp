import { NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgArrowComponent } from '../../svg/arrow/svg-arrow.component';
import { navbarData } from '../navbar.data';

@Component({
  selector: '[navbar]',
  standalone: true,
  imports: [SvgArrowComponent, NgComponentOutlet, RouterLink, NgIf, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isNavbarShort: boolean = false;
  navbarData = navbarData;
}
