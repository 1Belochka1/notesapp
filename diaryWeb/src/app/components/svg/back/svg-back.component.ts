import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'svg-back',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './svg-back.component.svg',
  styleUrl: './svg-back.component.scss',
})
export class SvgBackComponent {}
