import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../interfaces/Experience';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private url = 'https://breno-cv-server.vercel.app/experiences';

  private experienceListSubject = new BehaviorSubject<Experience[]>([]);
  public experienceList$: Observable<Experience[]>;

  constructor(private http: HttpClient) {
    this.experienceList$ = this.experienceListSubject.asObservable().pipe();
  }

  public getExperienceList(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.url).pipe(
      tap((experienceList) => {
        this.experienceListSubject.next(experienceList);
        return experienceList;
      })
    );
  }
}
