import { InjectionToken, WritableSignal } from "@angular/core";
import { Certificate, Education, Formation } from "../interfaces/Education";
import { Observable } from "rxjs";

export interface EducationRepository {
  loading: WritableSignal<boolean>;
  formationList$: Observable<Formation[]>;
  certificateList$: Observable<Certificate[]>;
  getEducationList(): Observable<Education>;
}

export const EDUCATION_REPOSITORY = new InjectionToken<EducationRepository>('EDUCATION_REPOSITORY');