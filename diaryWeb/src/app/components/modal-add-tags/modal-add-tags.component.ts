import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ITag } from '../../models/tag';
import { TagsService } from '../../services/tags.service';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';

@Component({
  selector: 'app-modal-add-tags',
  standalone: true,
  imports: [ModalLayoutComponent, FormsModule, NgIf, NgFor],
  providers: [TagsService],
  templateUrl: './modal-add-tags.component.html',
  styleUrl: './modal-add-tags.component.scss',
})
export class ModalAddTagsComponent implements OnInit {
  @Output() outsideClick: EventEmitter<void> = new EventEmitter<void>();

  @Output() addTagClick: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  noteTags: ITag[] = [];

  private _tagsSubscription: Subscription;

  createTagName: string = '';
  userTags: ITag[] = [];

  constructor(private _tagService: TagsService) {
    _tagService.createConnection();
  }

  createTag = () => this._tagService.createTag(this.createTagName);

  addTag(tagId: string) {
    this.addTagClick.emit(tagId);
    this.userTags = this.userTags.filter((tag) => tag.id != tagId);
  }

  clickLayout(ev: MouseEvent) {
    if ((ev.target as HTMLElement).localName == 'app-modal-layout') {
      this.outsideClick.emit();
    }
  }

  ngOnInit(): void {
    this._tagsSubscription = this._tagService.tags$().subscribe((tags) => {
      this.userTags =
        this.noteTags.length > 0
          ? tags.filter(
              (tag) => !this.noteTags.find((item) => item.id === tag.id)
            )
          : tags;
    });
  }
}
