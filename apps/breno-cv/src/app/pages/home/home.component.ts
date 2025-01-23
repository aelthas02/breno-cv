import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CustomImageComponent,
  TextComponent,
  TitleComponent,
  UnorderedListComponent,
  WindowsSizeService,
} from 'breno-storybook';
import { Observable } from 'rxjs';
import { ObjectivesService } from '../../services/objectives.service';

@Component({
  imports: [
    TitleComponent,
    CustomImageComponent,
    TextComponent,
    UnorderedListComponent,
    AsyncPipe,
  ],
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public isMobile$: Observable<boolean>;
  public objectiveList$: Observable<{ item: string }[]>;

  constructor(
    private windowSizeService: WindowsSizeService,
    private objectiveService: ObjectivesService
  ) {
    this.isMobile$ = this.windowSizeService.isMobile$;
    this.objectiveList$ = this.objectiveService.objectiveList$;
  }

  ngOnInit(): void {
    this.objectiveService.getobjectiveList().subscribe();
  }
}
