import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CollapsibleCardComponent,
  IconComponent,
  LoadingComponent,
  StripeComponent,
  SubtitleComponent,
  TitleComponent,
} from 'breno-storybook';
import { Observable } from 'rxjs';
import { Certificate, Formation } from '../../interfaces/Education';
import { EducationService } from '../../services/education.service';
import { Router } from '@angular/router';

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
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  public formationList$: Observable<Formation[]>;
  public certificateList$: Observable<Certificate[]>;
  public loading$: Observable<boolean>;

  constructor(
    private educationService: EducationService,
    private router: Router
  ) {
    this.loading$ = this.educationService.loading$;
    this.formationList$ = this.educationService.formationList$;
    this.certificateList$ = this.educationService.certificateList$;
    this.educationService.getEducationList().subscribe();
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}
