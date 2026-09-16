import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ObjectivesService } from './objectives.service';

describe('ObjectivesService', () => {
  let service: ObjectivesService;

  beforeEach(() => {
    // Registra o módulo de testes HTTP para fornecer HttpClient no ambiente de teste.
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    // Injeta o serviço com o provedor correto para validar a criação do mesmo.
    service = TestBed.inject(ObjectivesService);
  });

  it('should be created', () => {
    // Verifica que o serviço deve ser criado corretamente quando o provedor HTTP existe.
    expect(service).toBeTruthy();
  });
});
