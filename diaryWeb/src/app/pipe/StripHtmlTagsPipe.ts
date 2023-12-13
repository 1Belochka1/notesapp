import { Pipe, PipeTransform } from '@angular/core';
import { ContentService } from '../services/content.service';

@Pipe({
  name: 'stripHtmlTags',
  standalone: true,
})
export class StripHtmlTagsPipe implements PipeTransform {
  constructor(private _contentService: ContentService) {}

  transform(value: string): string {
    value = this._contentService.getContent(value);

    const div = document.createElement('div');
    div.innerHTML = value;
    return div.textContent || div.innerText || '';
  }
}
