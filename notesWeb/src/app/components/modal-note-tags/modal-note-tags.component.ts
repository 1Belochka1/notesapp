import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ITag } from '../../models/tag';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';

@Component({
  selector: 'app-modal-note-tags',
  standalone: true,
  imports: [ModalLayoutComponent, NgIf, NgFor],
  templateUrl: './modal-note-tags.component.html',
  styleUrl: './modal-note-tags.component.scss',
})
export class ModalNoteTagsComponent {
  @Output() outsideClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteTagClick: EventEmitter<string> = new EventEmitter<string>();
  @Input({ required: true })
  tags: ITag[];

  @ViewChild('layout')
  layout: ModalLayoutComponent;

  clickLayout(ev: MouseEvent) {
    if ((ev.target as HTMLElement).localName == 'app-modal-layout') {
      this.outsideClick.emit();
    }
  }
}
