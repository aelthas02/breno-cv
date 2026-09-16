import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EducationService } from './education.service';

describe('EducationService', () => {
  let service: EducationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Registra o módulo de testes HTTP para substituir a chamada real ao backend.
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(EducationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Garante que a requisição simulada foi consumida e não ficou pendente.
    httpMock.verify();
  });

  it('should be created', () => {
    // Verifica que a instância foi criada corretamente.
    expect(service).toBeTruthy();
  });

  it('should normalize formation data and emit certificate and formation lists', () => {
    // Prepara uma resposta realista para garantir que o serviço transforma os dados corretamente.
    const mockEducation = {
      formation: [
        {
          title: 'Engenharia de Software',
          skills: ['Angular', 'Node.js'],
          listContent: [{ item: 'Curso', subitem: '2024' }],
        },
      ],
      certificates: [{ label: 'AWS', certificateUrl: 'https://example.com/aws' }],
    };

    let result: unknown;
    service.getEducationList().subscribe((education) => {
      result = education;
    });

    const request = httpMock.expectOne('https://breno-cv-server.vercel.app/education');
    expect(request.request.method).toBe('GET');
    request.flush(mockEducation);

    expect(result).toEqual(mockEducation);
    service.formationList$.subscribe((formationList) => {
      expect(formationList).toEqual([
        {
          title: 'Engenharia de Software',
          skills: [],
          listContent: [{ item: 'Curso', subitem: '2024' }],
        },
      ]);
    });

    service.certificateList$.subscribe((certificateList) => {
      expect(certificateList).toEqual(mockEducation.certificates);
    });
  });
});
