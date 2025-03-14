import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CollapsibleCardComponent,
  IconComponent,
  LoadingComponent,
  TitleComponent,
} from 'breno-storybook';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Experience } from '../../interfaces/Experience';
import { ExperienceService } from '../../services/experiences.service';

@Component({
  selector: 'lib-experiences',
  imports: [
    CommonModule,
    IconComponent,
    TitleComponent,
    CollapsibleCardComponent,
    LoadingComponent,
  ],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent {
  public experienceList$: Observable<Experience[]>;
  public loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private experiencesService: ExperienceService
  ) {
    this.experienceList$ = this.experiencesService.experienceList$;
    this.loading$ = this.experiencesService.loading$;
    this.experiencesService.getExperienceList().subscribe();
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}
