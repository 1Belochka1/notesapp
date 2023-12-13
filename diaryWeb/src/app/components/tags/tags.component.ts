import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITag } from '../../models/tag';
import { mainLayoutRoutesConfig } from '../../routes/main-layout-routes.config';
import { TagsService } from '../../services/tags.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgIf, NgFor, ModalConfirmComponent],
  providers: [TagsService],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit, OnDestroy {
  private _tagsSubscription: Subscription;

  tags: ITag[] = [];

  tagIdToDelete: string = '';
  isOpenModalConfirm: boolean = false;
  isOpenModalUpdate: boolean = false;

  constructor(private _tagsService: TagsService, private _router: Router) {
    _tagsService.createConnection();
  }

  updateTag(id: string) {}

  callModalConfirmDeleteTag(id: string) {
    this.tagIdToDelete = id;
    this.isOpenModalConfirm = true;
  }

  deleteTag() {
    this._tagsService.deleteTag(this.tagIdToDelete);
    this.isOpenModalConfirm = false;
  }

  navigateToTag(id: string) {
    this._router.navigate([mainLayoutRoutesConfig.tag.path, id]);
  }

  ngOnInit(): void {
    this._tagsSubscription = this._tagsService.tags$().subscribe((tags) => {
      this.tags = tags;
    });
  }

  ngOnDestroy(): void {
    this._tagsSubscription.unsubscribe();
  }
}
