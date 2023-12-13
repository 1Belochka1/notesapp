import { mainLayoutRoutesConfig } from '../../routes/main-layout-routes.config';
import { SvgNotesComponent } from '../svg/notes/svg-notes.component';
import { SvgProfileComponent } from '../svg/profile/svg-profile.component';
import { SvgTagsComponent } from '../svg/tags/svg-tags.component';

export const navbarData = [
  {
    title: mainLayoutRoutesConfig.notes.title,
    routerLink: ['/', mainLayoutRoutesConfig.notes.path],
    svg: SvgNotesComponent,
  },
  {
    title: mainLayoutRoutesConfig.profile.title,
    routerLink: ['/', mainLayoutRoutesConfig.profile.path],
    svg: SvgProfileComponent,
  },
  {
    title: mainLayoutRoutesConfig.tags.title,
    routerLink: ['/', mainLayoutRoutesConfig.tags.path],
    svg: SvgTagsComponent,
  },
];
