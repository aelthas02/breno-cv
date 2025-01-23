import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { skillsRoutes } from '@breno-cv/skills';
import { experiencesRoutes } from '@breno-cv/experiences';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  skillsRoutes,
  experiencesRoutes,
  {
    path: '**',
    redirectTo: '',
  },
];
