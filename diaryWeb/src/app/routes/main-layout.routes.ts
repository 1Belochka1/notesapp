import { Routes } from '@angular/router';
import { mainLayoutRoutesConfig } from './main-layout-routes.config';

export const mainLayoutRoutes: Routes = [
  {
    title: mainLayoutRoutesConfig.notes.title,
    path: mainLayoutRoutesConfig.notes.path,
    component: mainLayoutRoutesConfig.notes.component,
  },
  {
    title: mainLayoutRoutesConfig.noteEditor.title,
    path: mainLayoutRoutesConfig.noteEditor.path + '/:id',
    component: mainLayoutRoutesConfig.noteEditor.component,
  },
  {
    title: mainLayoutRoutesConfig.tags.title,
    path: mainLayoutRoutesConfig.tags.path,
    component: mainLayoutRoutesConfig.tags.component,
  },
  {
    title: mainLayoutRoutesConfig.tag.title,
    path: mainLayoutRoutesConfig.tag.path + '/:id',
    component: mainLayoutRoutesConfig.tag.component,
  },
];
