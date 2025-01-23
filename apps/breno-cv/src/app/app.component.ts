import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent, WindowsSizeService } from 'breno-storybook';
import { ContactComponent } from '@breno-cv/shared';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';

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
})
export class AppComponent {
  public isMobile$: Observable<boolean>;

  public menuOptions: { label: string; route: string }[] = [
    { label: 'Experiences', route: 'experiences' },
    { label: 'Skills / Knowledge', route: 'skills' },
    { label: 'Education', route: 'education' },
  ];

  constructor(
    private windowSizeService: WindowsSizeService,
    private router: Router
  ) {
    if (typeof window !== 'undefined') {
      this.windowSizeService.setWindowsSize(screen.width);
    }
    this.isMobile$ = this.windowSizeService.isMobile$;
  }

  public goTo(route?: string): void {
    this.router.navigate([route || '']);
  }
}
