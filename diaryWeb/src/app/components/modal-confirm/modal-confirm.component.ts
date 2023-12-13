import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [ModalLayoutComponent],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss',
})
export class ModalConfirmComponent implements OnDestroy {
  @Output()
  confirm: EventEmitter<void> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input({ required: true })
  header: string;

  clickLayout(ev: MouseEvent) {
    if ((ev.target as HTMLElement).localName == 'app-modal-layout') {
      this.cancel.emit();
    }
  }

  cancelClick = () => this.cancel.emit();

  confirmClick = () => this.confirm.emit();

  ngOnDestroy(): void {}
}
