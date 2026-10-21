import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent, WindowsSizeService } from 'breno-cv-storybook';
import { ContactComponent } from '@breno-cv/shared';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  imports: [
    RouterModule,
    HeaderComponent,
    ContactComponent,
    AsyncPipe,
    NgClass,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly windowSizeService = inject(WindowsSizeService);
  private readonly router = inject(Router);

  public isMobile$: Observable<boolean>;

  public menuOptions: { label: string; route: string }[] = [
    { label: 'Experiences', route: 'experiences' },
    { label: 'Skills / Knowledge', route: 'skills' },
    { label: 'Education', route: 'education' },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.windowSizeService.setWindowsSize(screen.width);
    }
    this.isMobile$ = this.windowSizeService.isMobile$;
    this.setMetaData();
  }

  public goTo(route: string | Event = ''): void {
    if (typeof route !== 'string') {
      return;
    }

    this.router.navigate([route]);
  }

  private setMetaData(): void {
    this.title.setTitle(
      'CV | Breno M. Ambrosio'
    );

    this.meta.updateTag({
      name: 'description',
      content:
        'Welcome to my online CV. Feel free to learn more about my profile, skills and do not hesitate to contact me!'
    });
  }
}
