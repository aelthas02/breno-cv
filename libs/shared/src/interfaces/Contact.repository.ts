import { Observable } from "rxjs";
import { Contact } from "./Contact";
import { InjectionToken } from "@angular/core";

export interface ContactRepository {
  contactList$: Observable<Contact[]>;
  getContactList(): Observable<Contact[]>;
}

export const CONTACT_SERVICE = new InjectionToken<ContactRepository>('CONTACT_SERVICE');