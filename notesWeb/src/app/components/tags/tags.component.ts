import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITag } from '../../models/tag';
import { mainLayoutRoutesConfig } from '../../routes/main-layout-routes.config';
import { TagsService } from '../../services/tags.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalUpdateTagComponent } from '../modal-update-tag/modal-update-tag.component';

@Component({
	selector: 'app-tags',
	standalone: true,
	imports: [
		NgIf,
		NgFor,
		ModalConfirmComponent,
		ModalUpdateTagComponent,
		FormsModule,
	],
	providers: [TagsService],
	templateUrl: './tags.component.html',
	styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit, OnDestroy {
	private _tagsSubscription: Subscription;

	tags: ITag[] = [];
	viewTags: ITag[] = [];
	searchText: string = '';

	tagIdToDelete: string = '';
	tagIdToUpdate: string = '';
	tagNameToUpdate: string = '';

	isOpenModalConfirm: boolean = false;
	isOpenModalUpdate: boolean = false;

	constructor(private _tagsService: TagsService, private _router: Router) {
		_tagsService.createConnection();
	}

	searchInput = () => {
		this.viewTags =
			this.searchText.length < 1
				? this.tags
				: this.tags.filter((t) =>
						t.name.toLowerCase().includes(this.searchText.toLowerCase())
				  );
	};

	callModalConfirmDeleteTag(id: string) {
		this.tagIdToDelete = id;
		this.isOpenModalConfirm = true;
	}

	deleteTag() {
		this._tagsService.deleteTag(this.tagIdToDelete);
		this.isOpenModalConfirm = false;
	}

	callModalUpdateTag(id: string, name: string) {
		this.tagIdToUpdate = id;
		this.tagNameToUpdate = name;
		this.isOpenModalUpdate = true;
	}

	updateTag(name: string) {
		this._tagsService.updateTag(this.tagIdToUpdate, name);
		this.isOpenModalUpdate = false;
	}

	navigateToTag(id: string) {
		this._router.navigate([mainLayoutRoutesConfig.tag.path, id]);
	}

	ngOnInit(): void {
		this._tagsSubscription = this._tagsService.tags$().subscribe((tags) => {
			this.tags = tags;
			this.searchInput();
		});
	}

	ngOnDestroy(): void {
		this._tagsSubscription.unsubscribe();
	}
}
