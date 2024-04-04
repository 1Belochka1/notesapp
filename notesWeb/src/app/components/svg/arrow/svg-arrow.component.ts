import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-arrow',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './svg-arrow.component.svg',
  styleUrl: './svg-arrow.component.scss',
})
export class SvgArrowComponent {
  @Input()
  rotate: 'left' | 'right' | 'up' | 'down' = 'left';
}
