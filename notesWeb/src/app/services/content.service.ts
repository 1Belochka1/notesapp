import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor() {}

  getContent(htmlString: string): string {
    const startTag = '</h1>';

    const startIndex = htmlString.indexOf(startTag);

    return startIndex !== -1
      ? htmlString.substring(startIndex + startTag.length)
      : htmlString;
  }

  getTitle(htmlString: string): string {
    const startTag = '<h1>';
    const endTag = '</h1>';

    const startIndex = htmlString.indexOf(startTag);
    const endIndex = htmlString.indexOf(endTag);

    let title = '';

    if (startIndex !== -1 && endIndex !== -1) {
      title = htmlString.substring(startIndex + startTag.length, endIndex);
      if (title == '&nbsp;') title = '';
    }

    return title;
  }

  getTitleAndContent(htmlString: string): {
    title: string;
    content: string;
  } {
    const title = this.getTitle(htmlString);
    const content = this.getContent(htmlString);
    return { title, content };
  }
}
