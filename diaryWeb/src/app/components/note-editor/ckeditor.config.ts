import { EditorConfig } from '@ckeditor/ckeditor5-core';

export const ckeditorConfig: EditorConfig = {
  image: {
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        icon: 'original',
      },
      {
        name: 'resizeImage:20',
        value: '20',
        icon: 'small',
      },
      {
        name: 'resizeImage:50',
        value: '50',
        icon: 'medium',
      },
      {
        name: 'resizeImage:75',
        value: '75',
        icon: 'large',
      },
    ],
    toolbar: [
      'toggleImageCaption',
      'imageTextAlternative',
      '|',
      'resizeImage:20',
      'resizeImage:50',
      'resizeImage:75',
      'resizeImage:original',
      '|',
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
    ],
  },
  title: { placeholder: 'Заголовок' },
};
