import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CollapsibleCardComponent,
  IconComponent,
  LoadingComponent,
  TitleComponent,
} from 'breno-cv-storybook';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Experience } from '../../interfaces/Experience';
import { ExperienceService } from '../../services/experiences.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private readonly router = inject(Router);
  private readonly experiencesService = inject(ExperienceService);
  private readonly destroyRef = inject(DestroyRef);

  public experienceList$: Observable<Experience[]> = this.experiencesService.experienceList$;;
  public loading$: Observable<boolean> = this.experiencesService.loading$;;

  constructor(
  ) {
    this.experiencesService.getExperienceList().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}
