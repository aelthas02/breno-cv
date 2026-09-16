import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Registra o módulo de testes HTTP para substituir a comunicação real do cliente HTTP.
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Garante que todas as requisições simuladas sejam consumidas e evita vazamentos de estado.
    httpMock.verify();
  });

  it('should be created', () => {
    // Verifica que o serviço foi criado corretamente quando o provedor HTTP está disponível.
    expect(service).toBeTruthy();
  });

  it('should load the contact list and emit it through the observable', () => {
    // Prepara a resposta simulada e valida o fluxo de dados do serviço.
    const mockContacts = [
      { id: '1', icon: 'mail', value: 'test@email.com', copyValue: 'test@email.com', description: 'Email', },
    ];

    let result: unknown[] | undefined;
    service.getContactList().subscribe((contacts) => {
      result = contacts;
    });

    const request = httpMock.expectOne('https://breno-cv-server.vercel.app/contacts');
    expect(request.request.method).toBe('GET');
    request.flush(mockContacts);

    expect(result).toEqual(mockContacts);
    service.contactList$.subscribe((contacts) => {
      expect(contacts).toEqual(mockContacts);
    });
  });
});
