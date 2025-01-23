import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { skillsRoutes } from '@breno-cv/skills';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  skillsRoutes,
  {
    path: '**',
    redirectTo: '',
  },
];
