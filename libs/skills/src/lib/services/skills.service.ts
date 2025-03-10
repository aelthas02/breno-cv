import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skill, SkillResponse } from '../interfaces/Skill';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private url = 'https://breno-cv-server.vercel.app/skills';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean>;

  private skillListSubject = new BehaviorSubject<SkillResponse[]>([]);
  public skillList$: Observable<SkillResponse[]>;

  constructor(private http: HttpClient) {
    this.skillList$ = this.skillListSubject.asObservable().pipe();
    this.loading$ = this.loadingSubject.asObservable().pipe();
  }

  public getSkillsList(): Observable<Skill[]> {
    this.loadingSubject.next(true);
    return this.http.get<Skill[]>(this.url).pipe(
      tap((skillsList) => {
        this.skillListSubject.next(
          skillsList.map((x) => ({
            icon: x.icon,
            type: x.type,
            items: x.items.map((y) => ({ item: y })),
          }))
        );
        this.loadingSubject.next(false);
        return skillsList;
      })
    );
  }
}
