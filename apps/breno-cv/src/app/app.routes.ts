import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { skillsRoutes } from '@breno-cv/skills';
import { experiencesRoutes } from '@breno-cv/experiences';
import { educationRoutes } from '@breno-cv/education';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  skillsRoutes,
  experiencesRoutes,
  educationRoutes,
  {
    path: '**',
    redirectTo: '',
  },
];
