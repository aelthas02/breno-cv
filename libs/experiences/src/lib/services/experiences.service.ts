import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../interfaces/Experience';
import { ExperienceRepository } from '../interfaces/Experience.repository';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService implements ExperienceRepository {
  private readonly http = inject(HttpClient);
  private url = 'https://breno-cv-server.vercel.app/experiences';

  public readonly loading: WritableSignal<boolean> = signal<boolean>(false);

  private experienceListSubject = new BehaviorSubject<Experience[]>([]);
  public experienceList$: Observable<Experience[]> = this.experienceListSubject.asObservable();

  public getExperienceList(): Observable<Experience[]> {
    this.loading.set(true);
    return this.http.get<Experience[]>(this.url).pipe(
      tap((experienceList) => {
        this.experienceListSubject.next(experienceList);
        this.loading.set(false);
        return experienceList;
      })
    );
  }
}
