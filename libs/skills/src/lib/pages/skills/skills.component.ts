import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IconComponent,
  LoadingComponent,
  TitleComponent,
  UnorderedListComponent,
} from 'breno-cv-storybook';
import { Observable } from 'rxjs';
import { SkillResponse } from '../../interfaces/Skill';
import { SkillsService } from '../../services/skills.service';
import { Router } from '@angular/router';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-skills',
  imports: [
    CommonModule,
    UnorderedListComponent,
    IconComponent,
    TitleComponent,
    LoadingComponent,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  private readonly skillService = inject(SkillsService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public skillList$: Observable<SkillResponse[]> = this.skillService.skillList$;;
  public loading$: Observable<boolean> = this.skillService.loading$;

  constructor() {
    this.skillService.getSkillsList().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}
