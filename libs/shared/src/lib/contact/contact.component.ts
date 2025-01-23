import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  CardComponent,
  ColorsEnum,
  IconComponent,
  TextComponent,
  WindowsSizeService,
} from 'breno-storybook';
import { Observable } from 'rxjs';
import { Contact } from '../../interfaces/Contact';
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
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  public isMobile$: Observable<boolean>;
  public contactList$: Observable<Contact[]>;

  public orangeColor: ColorsEnum = ColorsEnum.ORANGE;

  constructor(
    private windowSizeService: WindowsSizeService,
    private contactService: ContactService
  ) {
    this.isMobile$ = this.windowSizeService.isMobile$;
    this.contactList$ = this.contactService.contactList$;
  }

  ngOnInit(): void {
    this.contactService.getContactList().subscribe();
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
