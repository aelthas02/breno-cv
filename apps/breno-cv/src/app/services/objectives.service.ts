import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Objective } from '../interfaces/Objective';

@Injectable({
  providedIn: 'root',
})
export class ObjectivesService {
  private url = 'https://breno-cv-server.vercel.app/objectives';

  private objectiveListSubject = new BehaviorSubject<{ item: string }[]>([]);
  public objectiveList$: Observable<{ item: string }[]>;

  constructor(private http: HttpClient) {
    this.objectiveList$ = this.objectiveListSubject.asObservable().pipe();
  }

  public getobjectiveList(): Observable<Objective[]> {
    return this.http.get<Objective[]>(this.url).pipe(
      tap((objectiveList) => {
        const retifiedResponse: { item: string }[] = objectiveList.map((x) => ({
          item: x.objective,
        }));
        this.objectiveListSubject.next(retifiedResponse);
        return objectiveList;
      })
    );
  }
}
