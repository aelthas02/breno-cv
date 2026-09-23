import { ChangeDetectionStrategy, Component, DestroyRef, inject, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CollapsibleCardComponent,
  IconComponent,
  LoadingComponent,
  StripeComponent,
  SubtitleComponent,
  TitleComponent,
} from 'breno-cv-storybook';
import { Observable } from 'rxjs';
import { Certificate, Formation } from '../../interfaces/Education';
import { EducationService } from '../../services/education.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EDUCATION_REPOSITORY } from '../../repositories/Education.repository';

@Component({
  selector: 'lib-education',
  imports: [
    CommonModule,
    IconComponent,
    TitleComponent,
    SubtitleComponent,
    CollapsibleCardComponent,
    StripeComponent,
    LoadingComponent,
  ],
  providers: [{
    provide: EDUCATION_REPOSITORY,
    useClass: EducationService
  }],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {
  private readonly educationService = inject(EDUCATION_REPOSITORY);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public formationList$: Observable<Formation[]> = this.educationService.formationList$;;
  public certificateList$: Observable<Certificate[]> = this.educationService.certificateList$;;
  public loading: boolean = this.educationService.loading();

  constructor(
  ) {
    this.educationService.getEducationList().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}

