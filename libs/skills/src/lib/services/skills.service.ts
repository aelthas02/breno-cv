import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skill, SkillResponse } from '../interfaces/Skill';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private url = 'http://localhost:3000/skills';

  private skillListSubject = new BehaviorSubject<SkillResponse[]>([]);
  public skillList$: Observable<SkillResponse[]>;

  constructor(private http: HttpClient) {
    this.skillList$ = this.skillListSubject.asObservable().pipe();
  }

  public getSkillsList(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.url).pipe(
      tap((skillsList) => {
        this.skillListSubject.next(
          skillsList.map((x) => ({
            icon: x.icon,
            type: x.type,
            items: x.items.map((y) => ({ item: y })),
          }))
        );
        return skillsList;
      })
    );
  }
}
