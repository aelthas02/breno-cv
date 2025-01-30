import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../interfaces/Experience';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private url = 'https://breno-cv-server.vercel.app/experiences';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean>;

  private experienceListSubject = new BehaviorSubject<Experience[]>([]);
  public experienceList$: Observable<Experience[]>;

  constructor(private http: HttpClient) {
    this.experienceList$ = this.experienceListSubject.asObservable().pipe();
    this.loading$ = this.loadingSubject.asObservable().pipe();
  }

  public getExperienceList(): Observable<Experience[]> {
    this.loadingSubject.next(true);
    return this.http.get<Experience[]>(this.url).pipe(
      tap((experienceList) => {
        this.experienceListSubject.next(experienceList);
        this.loadingSubject.next(false);
        return experienceList;
      })
    );
  }
}
