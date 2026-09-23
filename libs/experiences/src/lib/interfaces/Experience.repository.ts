import { Observable } from "rxjs";
import { Experience } from "./Experience";
import { InjectionToken, WritableSignal } from "@angular/core";

export interface ExperienceRepository {
  experienceList$: Observable<Experience[]>;
  loading: WritableSignal<boolean>;
  getExperienceList(): Observable<Experience[]>
}

export const EXPERIENCES_SERVICE = new InjectionToken<ExperienceRepository>('EXPERIENCES_SERVICE');