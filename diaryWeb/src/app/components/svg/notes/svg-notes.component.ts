import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-notes',
  standalone: true,
  imports: [],
  templateUrl: './svg-notes.component.svg',
  styleUrl: './svg-notes.component.scss',
})
export class SvgNotesComponent {
  @Input()
  isHovered: boolean;
}
