import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EXPERIENCES_SERVICE } from '../../interfaces/Experience.repository';
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
  providers: [{ provide: EXPERIENCES_SERVICE, useClass: ExperienceService }],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencesComponent {
  private readonly router = inject(Router);
  private readonly experiencesRepository = inject(EXPERIENCES_SERVICE);
  private readonly destroyRef = inject(DestroyRef);

  public experienceList$: Observable<Experience[]> = this.experiencesRepository.experienceList$;
  public loading: boolean = this.experiencesRepository.loading();

  constructor(
  ) {
    this.experiencesRepository.getExperienceList().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}
