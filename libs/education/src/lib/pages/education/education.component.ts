import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CollapsibleCardComponent,
  IconComponent,
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
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent implements OnInit {
  public formationList$: Observable<Formation[]>;
  public certificateList$: Observable<Certificate[]>;

  constructor(
    private educationService: EducationService,
    private router: Router
  ) {
    this.formationList$ = this.educationService.formationList$;
    this.certificateList$ = this.educationService.certificateList$;
  }

  ngOnInit(): void {
    this.educationService.getEducationList().subscribe();
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}
