import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IconComponent,
  TitleComponent,
  UnorderedListComponent,
} from 'breno-storybook';
import { Observable } from 'rxjs';
import { SkillResponse } from '../../interfaces/Skill';
import { SkillsService } from '../../services/skills.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-skills',
  imports: [
    CommonModule,
    UnorderedListComponent,
    IconComponent,
    TitleComponent,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  public skillList$: Observable<SkillResponse[]>;

  constructor(private skillService: SkillsService, private router: Router) {
    this.skillList$ = this.skillService.skillList$;
  }

  ngOnInit(): void {
    this.skillService.getSkillsList().subscribe();
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}
