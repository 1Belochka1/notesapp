import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { ITag } from '../../models/tag';
import { TagsService } from '../../services/tags.service';
import { ModalLayoutComponent } from '../modal-layout/modal-layout.component';

@Component({
	selector: 'app-modal-add-tags',
	standalone: true,
	imports: [ModalLayoutComponent, FormsModule, NgIf, NgFor, AsyncPipe],
	providers: [TagsService],
	templateUrl: './modal-add-tags.component.html',
	styleUrl: './modal-add-tags.component.scss',
})
export class ModalAddTagsComponent implements OnInit, OnDestroy {
	@Output() outsideClick: EventEmitter<void> = new EventEmitter<void>();

	@Output() addTagClick: EventEmitter<string> = new EventEmitter<string>();

	@Input()
	noteTags: ITag[] = [];
	viewTags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
	userTags: ITag[] = [];
	createTagName: string = '';
	searchText: string = '';
	errorCreateTag: string | null = null;
	errorSearchTag: string | null = null;
	private _tagsSubscription: Subscription;
	private _errorSubscription: Subscription;

	constructor(private _tagsService: TagsService) {
		_tagsService.createConnection();
	}

	searchInput() {
		if (this.searchText.length > 50) {
			this.errorSearchTag = 'Максимальная длинна 50';
		} else {
			this.errorSearchTag = null;
		}

		this.viewTags.next(
			this.searchText.length < 1
				? this.userTags
				: this.userTags.filter((t) =>
						t.name.toLowerCase().includes(this.searchText.toLowerCase())
				  )
		);
	}

	createTag() {
		if (this.createTagName.length < 0) {
			this.errorCreateTag = 'Поле обязательно для заполнения';
			return;
		}
		if (this.createTagName.length > 50) {
			this.errorCreateTag = 'Максимальная длинна 50';
			return;
		}

		this._tagsService.createTag(this.createTagName);
	}

	addTag(tagId: string) {
		this.addTagClick.emit(tagId);
		this.userTags = this.userTags.filter((tag) => tag.id != tagId);
		this.viewTags.next(this.userTags);
	}

	clickLayout(ev: MouseEvent) {
		if ((ev.target as HTMLElement).localName == 'app-modal-layout') {
			this.outsideClick.emit();
		}
	}

	ngOnInit(): void {
		this._tagsSubscription = this._tagsService
			.tags$()
			.pipe(
				map((tags) =>
					this.noteTags.length > 0
						? tags.filter(
								(tag) => !this.noteTags.find((item) => item.id === tag.id)
						  )
						: tags
				)
			)
			.subscribe((tags) => {
				this.userTags = tags;
				this.searchInput();
			});

		this._errorSubscription = this._tagsService
			.error$()
			.subscribe((error) => (this.errorCreateTag = error));
	}

	ngOnDestroy(): void {
		this._tagsSubscription.unsubscribe();
	}
}
