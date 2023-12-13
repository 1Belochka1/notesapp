import { NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { SvgArrowComponent } from '../svg/arrow/svg-arrow.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NgComponentOutlet,
    RouterLink,
    NgFor,
    NgIf,
    SvgArrowComponent,
    NavbarComponent,
  ],
  providers: [NotesService],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  NavbarComponent = NavbarComponent;
  constructor() {}
}
