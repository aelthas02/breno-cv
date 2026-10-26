import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  EDUCATION_REPOSITORY,
  EducationRepository,
} from '../../repositories/Education.repository';
import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async () => {
    // Prepara o serviço de educação com observables vazios para não acoplar o teste ao backend.
    const educationServiceMock = {
      getEducationList: jest.fn().mockReturnValue(of({ formation: [], certificates: [] })),
      formationList$: of([]),
      certificateList$: of([]),
      loading: signal(false),
    } satisfies EducationRepository;

    TestBed.configureTestingModule({
      imports: [EducationComponent],
      providers: [provideRouter([])],
    });
    TestBed.overrideComponent(EducationComponent, {
      set: {
        providers: [
          { provide: EDUCATION_REPOSITORY, useValue: educationServiceMock },
        ],
      },
    });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Confirma que o componente foi criado corretamente em um ambiente isolado.
    expect(component).toBeTruthy();
  });
});
