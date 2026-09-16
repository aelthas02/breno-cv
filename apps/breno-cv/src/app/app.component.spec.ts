import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { WindowsSizeService } from 'breno-cv-storybook';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Dá ao componente os dependentes mínimos para não falhar por serviços externos.
    const windowSizeService = {
      isMobile$: { subscribe: jest.fn() },
      setWindowsSize: jest.fn(),
    } as unknown as WindowsSizeService;

    // Configura o componente para um teste isolado e sem depender do template externo completo.
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: WindowsSizeService, useValue: windowSizeService },
        provideRouter([]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create the component', () => {
    // Cria o componente e confirma que a instância foi gerada corretamente.
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should navigate to the selected route when goTo is called', () => {
    // Obtém o router do ambiente de teste para validar a navegação.
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');
    const fixture = TestBed.createComponent(AppComponent);

    // Executa o método público do componente com rota informada.
    fixture.componentInstance.goTo('skills');

    // Verifica que a navegação foi disparada com a rota correta.
    expect(navigateSpy).toHaveBeenCalledWith(['skills']);
  });
});
