import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, WindowsSizeService } from 'breno-storybook';
import { ContactComponent } from '@breno-cv/shared';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgClass } from '@angular/common';

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

  public menuOptions: string[] = [
    'Experiences',
    'Skills / Knowledge',
    'Education',
  ];

  constructor(private windowSizeService: WindowsSizeService) {
    if (typeof window !== 'undefined') {
      this.windowSizeService.setWindowsSize(screen.width);
    }
    this.isMobile$ = this.windowSizeService.isMobile$;
  }

  public goTo(event: string): void {}
}
