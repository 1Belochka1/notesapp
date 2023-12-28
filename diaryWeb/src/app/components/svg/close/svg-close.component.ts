import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'svg-close',
	standalone: true,
	imports: [NgStyle],
	templateUrl: './svg-close.component.svg',
	styleUrl: './svg-close.component.scss',
})
export class SvgCloseComponent {}
