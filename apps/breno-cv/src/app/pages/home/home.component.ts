import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  CustomImageComponent,
  TextComponent,
  TitleComponent,
  UnorderedListComponent,
  WindowsSizeService,
} from 'breno-cv-storybook';
import { Observable } from 'rxjs';
import { ObjectivesService } from '../../services/objectives.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    TitleComponent,
    CustomImageComponent,
    TextComponent,
    UnorderedListComponent,
    AsyncPipe,
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly windowSizeService = inject(WindowsSizeService)
  private readonly objectiveService = inject(ObjectivesService);
  private readonly destroyRef = inject(DestroyRef);

  public isMobile$: Observable<boolean> = this.windowSizeService.isMobile$;
  public objectiveList$: Observable<{ item: string }[]> = this.objectiveService.objectiveList$;

  ngOnInit(): void {
    this.objectiveService.getObjectiveList().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
