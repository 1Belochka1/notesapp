import { Component, Input } from '@angular/core';
import { ITags } from 'src/app/models/tags';

@Component({
	selector: 'tags-custom-dropdown',
	templateUrl: './custom-dropdown-tags.component.html',
	styleUrl: './custom-dropdown-tags.component.scss',
})
export class CustomDropdownTagsComponent {
	@Input()
	tags: ITags[];

	onOpen: boolean = false;

	toggleShowList(ev: any) {
		// console.log(ev.target.checked);
		console.log(this.tags);
		this.onOpen = ev.target.checked;
	}
}
