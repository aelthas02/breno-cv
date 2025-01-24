import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Certificate, Education, Formation } from '../interfaces/Education';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private url = 'https://breno-cv-server.vercel.app/education';

  private formationListSubject = new BehaviorSubject<Formation[]>([]);
  public formationList$: Observable<Formation[]>;

  private certificateListSubject = new BehaviorSubject<Certificate[]>([]);
  public certificateList$: Observable<Certificate[]>;

  constructor(private http: HttpClient) {
    this.formationList$ = this.formationListSubject.asObservable().pipe();
    this.certificateList$ = this.certificateListSubject.asObservable().pipe();
  }

  public getEducationList(): Observable<Education> {
    return this.http.get<Education>(this.url).pipe(
      tap((educationList) => {
        educationList.formation.forEach((x) => (x.skills = []));
        this.formationListSubject.next(educationList.formation);
        this.certificateListSubject.next(educationList.certificates);
        return educationList;
      })
    );
  }
}
