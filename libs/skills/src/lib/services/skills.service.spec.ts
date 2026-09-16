import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  let service: SkillsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Registra o módulo de testes HTTP para simular as chamadas do backend sem rede real.
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(SkillsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Garante que todas as requisições simuladas tenham sido consumidas.
    httpMock.verify();
  });

  it('should be created', () => {
    // Verifica que a instância do serviço foi criada corretamente.
    expect(service).toBeTruthy();
  });

  it('should map raw skills data and update the loading state', () => {
    // Prepara a resposta simulada e valida a transformação dos dados antes de expor no observable.
    const mockSkills = [
      { type: 'Frontend', icon: 'code', items: ['Angular', 'TypeScript'] },
    ];

    let loadingState: boolean | undefined;
    let result: unknown;

    service.loading$.subscribe((value) => {
      loadingState = value;
    });

    service.getSkillsList().subscribe((skills) => {
      result = skills;
    });

    const request = httpMock.expectOne('https://breno-cv-server.vercel.app/skills');
    expect(request.request.method).toBe('GET');
    request.flush(mockSkills);

    expect(loadingState).toBe(false);
    expect(result).toEqual(mockSkills);
    service.skillList$.subscribe((skills) => {
      expect(skills).toEqual([
        { icon: 'code', type: 'Frontend', items: [{ item: 'Angular' }, { item: 'TypeScript' }] },
      ]);
    });
  });
});
