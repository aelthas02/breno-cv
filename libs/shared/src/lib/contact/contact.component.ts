import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  CardComponent,
  ColorsEnum,
  IconComponent,
  TextComponent,
  WindowsSizeService,
} from 'breno-cv-storybook';
import { Observable } from 'rxjs';
import { Contact } from '../../interfaces/Contact';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CONTACT_SERVICE } from '../../interfaces/Contact.repository';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'lib-contact',
  imports: [
    CommonModule,
    CardComponent,
    IconComponent,
    TextComponent,
    AsyncPipe,
  ],
  providers: [{ provide: CONTACT_SERVICE, useClass: ContactService }],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private readonly windowSizeService = inject(WindowsSizeService);
  private readonly contactService = inject(CONTACT_SERVICE);
  private readonly destroyRef = inject(DestroyRef);

  public isMobile$: Observable<boolean> = this.windowSizeService.isMobile$;
  public contactList$: Observable<Contact[]> = this.contactService.contactList$;

  public orangeColor: ColorsEnum = ColorsEnum.ORANGE;


  ngOnInit(): void {
    this.contactService.getContactList().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public copyToClipboard(value: string): void {
    navigator.clipboard.writeText(value);
  }

  public openContact(value: string): void {
    if (value.includes('@')) {
      window.location.href = `mailto:${value}`;
    } else {
      window.open(value, '_blank');
    }
  }
}
