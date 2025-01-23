import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Contact } from '../interfaces/Contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private url: string = 'http://localhost:3000/contacts';

  private contactListSubject = new BehaviorSubject<Contact[]>([]);
  public contactList$: Observable<Contact[]>;

  constructor(private http: HttpClient) {
    this.contactList$ = this.contactListSubject.asObservable().pipe();
  }

  public getContactList(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url).pipe(
      tap((contactList) => {
        this.contactListSubject.next(contactList);
        return contactList;
      })
    );
  }
}
