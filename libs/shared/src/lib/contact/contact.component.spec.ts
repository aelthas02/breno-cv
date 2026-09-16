import { of } from 'rxjs';
import { WindowsSizeService } from 'breno-cv-storybook';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactService } from '../../services/contact.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    // Prepara o serviço de contatos com um estado estável e previsível para o template.
    const contactServiceMock = {
      getContactList: jest.fn().mockReturnValue(of([])),
      contactList$: of([]),
    } as unknown as jest.Mocked<ContactService>;

    // Prepara o serviço de responsividade para evitar dependências do ambiente real.
    const windowSizeServiceMock = {
      isMobile$: of(false),
    } as unknown as jest.Mocked<WindowsSizeService>;

    // Configura o componente standalone com dependências mínimas para o teste de criação.
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        { provide: ContactService, useValue: contactServiceMock },
        { provide: WindowsSizeService, useValue: windowSizeServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica que o componente foi criado com as dependências corretamente injetadas.
    expect(component).toBeTruthy();
  });
});
