import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Objective } from '../interfaces/Objective';

type ObjectiveSummary = {
  item: string;
};

@Injectable({
  providedIn: 'root',
})
export class ObjectivesService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://breno-cv-server.vercel.app/objectives';

  private readonly objectiveListSubject = new BehaviorSubject<ObjectiveSummary[]>([]);
  public readonly objectiveList$ = this.objectiveListSubject.asObservable();

  public getObjectiveList(): Observable<ObjectiveSummary[]> {
    return this.http.get<Objective[]>(this.url).pipe(
      map((objectiveList) =>
        objectiveList.map(({ objective }) => ({
          item: objective,
        }))
      ),
      tap((objectiveList) => {
        this.objectiveListSubject.next(objectiveList);
      })
    );
  }
}
