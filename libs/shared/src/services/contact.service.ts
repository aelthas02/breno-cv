import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Contact } from '../interfaces/Contact';
import { HttpClient } from '@angular/common/http';
import { ContactRepository } from '../interfaces/Contact.repository';

@Injectable({
  providedIn: 'root',
})
export class ContactService implements ContactRepository {
  private readonly http = inject(HttpClient);
  private url = 'https://breno-cv-server.vercel.app/contacts';

  private contactListSubject = new BehaviorSubject<Contact[]>([]);
  public contactList$: Observable<Contact[]> = this.contactListSubject.asObservable().pipe();

  public getContactList(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url).pipe(
      tap((contactList) => {
        this.contactListSubject.next(contactList);
        return contactList;
      })
    );
  }
}
