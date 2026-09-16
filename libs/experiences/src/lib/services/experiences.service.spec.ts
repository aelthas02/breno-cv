import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExperienceService } from './experiences.service';

describe('ExperienceService', () => {
  let service: ExperienceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Registra o módulo de testes HTTP para simular a API sem depender de uma instância real.
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ExperienceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Valida que não houve requisições pendentes após cada teste.
    httpMock.verify();
  });

  it('should be created', () => {
    // Confirma que o serviço foi instanciado corretamente.
    expect(service).toBeTruthy();
  });

  it('should emit the experience list and set loading to false after the request', () => {
    // Prepara uma lista simulada de experiências para validar o fluxo de sucesso do serviço.
    const mockExperiences = [
      { title: 'Senior Frontend', skills: ['Angular'], listContent: [{ item: 'Build UI', subitem: '2024' }] },
    ];

    let result: unknown;
    let loadingState: boolean | undefined;

    service.loading$.subscribe((value) => {
      loadingState = value;
    });

    service.getExperienceList().subscribe((experiences) => {
      result = experiences;
    });

    const request = httpMock.expectOne('https://breno-cv-server.vercel.app/experiences');
    expect(request.request.method).toBe('GET');
    request.flush(mockExperiences);

    expect(result).toEqual(mockExperiences);
    expect(loadingState).toBe(false);
    service.experienceList$.subscribe((experiences) => {
      expect(experiences).toEqual(mockExperiences);
    });
  });
});
