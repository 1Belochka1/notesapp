import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'svg-tags',
  standalone: true,
  imports: [],
  templateUrl: './svg-tags.component.svg',
  styleUrl: './svg-tags.component.scss',
})
export class SvgTagsComponent implements OnInit {
  @Input()
  width: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setWidthSvg();
  }

  setWidthSvg() {
    const svgEl = this.elementRef.nativeElement.querySelector('svg');

    const width =
      this.width ??
      getComputedStyle(document.documentElement).getPropertyValue(
        '--width-svg'
      );

    this.renderer.setAttribute(svgEl, 'width', width);
  }

  @HostListener('window:resize')
  onCSSVariableChange(): void {
    this.setWidthSvg();
  }
}
