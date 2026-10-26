import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  EXPERIENCES_SERVICE,
  ExperienceRepository,
} from '../../interfaces/Experience.repository';
import { ExperiencesComponent } from './experiences.component';

describe('ExperiencesComponent', () => {
  let component: ExperiencesComponent;
  let fixture: ComponentFixture<ExperiencesComponent>;

  beforeEach(async () => {
    // Prepara o serviço de experiências com dados vazios para evitar dependência do backend.
    const experienceServiceMock = {
      getExperienceList: jest.fn().mockReturnValue(of([])),
      experienceList$: of([]),
      loading: signal(false),
    } satisfies ExperienceRepository;

    TestBed.configureTestingModule({
      imports: [ExperiencesComponent],
      providers: [provideRouter([])],
    });
    TestBed.overrideComponent(ExperiencesComponent, {
      set: {
        providers: [
          { provide: EXPERIENCES_SERVICE, useValue: experienceServiceMock },
        ],
      },
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(ExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica que o componente foi criado sem erros de injeção de dependência.
    expect(component).toBeTruthy();
  });
});
