import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from '../../models/note';
import { StripHtmlTagsPipe } from '../../pipe/StripHtmlTagsPipe';
import { mainLayoutRoutesConfig } from '../../routes/main-layout-routes.config';
import { TagService } from '../../services/tag.service';
import { SvgTagsComponent } from '../svg/tags/svg-tags.component';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [NgIf, NgFor, StripHtmlTagsPipe, SvgTagsComponent, DatePipe],
  providers: [TagService],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent implements OnInit {
  notes: INote[];

  constructor(private _tagService: TagService, private _router: Router) {
    _tagService.createConnection();
  }

  navigateToNote(id: string) {
    this._router.navigate([mainLayoutRoutesConfig.noteEditor.path, id]);
  }

  ngOnInit(): void {
    this._tagService.notes().subscribe((notes) => {
      this.notes = notes;
    });
  }
}
