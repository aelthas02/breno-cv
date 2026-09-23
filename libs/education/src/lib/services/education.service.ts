import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Certificate, Education, Formation } from '../interfaces/Education';
import { EducationRepository } from '../repositories/Education.repository';

@Injectable({
  providedIn: 'root',
})
export class EducationService implements EducationRepository {
  private readonly http = inject(HttpClient);
  private url = 'https://breno-cv-server.vercel.app/education';

  public readonly loading: WritableSignal<boolean> = signal<boolean>(false);

  private formationListSubject = new BehaviorSubject<Formation[]>([]);
  public formationList$: Observable<Formation[]> = this.formationListSubject.asObservable();

  private certificateListSubject = new BehaviorSubject<Certificate[]>([]);
  public certificateList$: Observable<Certificate[]> = this.certificateListSubject.asObservable();


  public getEducationList(): Observable<Education> {
    this.loading.set(true);
    return this.http.get<Education>(this.url).pipe(
      tap((educationList) => {
        educationList.formation.forEach((x) => (x.skills = []));
        this.formationListSubject.next(educationList.formation);
        this.certificateListSubject.next(educationList.certificates);
        this.loading.set(false);
        return educationList;
      })
    );
  }
}
