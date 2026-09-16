import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WindowsSizeService } from 'breno-cv-storybook';
import { ObjectivesService } from '../../services/objectives.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let objectiveService: jest.Mocked<ObjectivesService>;
  let windowSizeService: jest.Mocked<WindowsSizeService>;

  beforeEach(async () => {
    // Prepara um serviço de objetivos estável e previsível para o template.
    objectiveService = {
      getObjectiveList: jest.fn().mockReturnValue(
        of([
          { item: 'Construir interfaces de alto impacto' },
          { item: 'Melhorar a experiência do usuário' },
        ])
      ),
      objectiveList$: of([
        { item: 'Construir interfaces de alto impacto' },
        { item: 'Melhorar a experiência do usuário' },
      ]),
    } as unknown as jest.Mocked<ObjectivesService>;

    // Prepara o serviço de responsividade para o teste de layout responsivo.
    windowSizeService = {
      isMobile$: of(false),
    } as unknown as jest.Mocked<WindowsSizeService>;

    // Configura o módulo de teste com o componente em standalone e os providers mockados.
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ObjectivesService, useValue: objectiveService },
        { provide: WindowsSizeService, useValue: windowSizeService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    // Cria a instância do componente para cada teste com estado limpo.
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    // Verifica que a instância foi criada e está pronta para uso.
    expect(component).toBeTruthy();
  });

  it('should call getObjectiveList when the component initializes', () => {
    // Dispara o ciclo de vida do Angular para executar o ngOnInit.
    fixture.detectChanges();

    // Confirma que o carregamento dos objetivos acontece na inicialização.
    expect(objectiveService.getObjectiveList).toHaveBeenCalledTimes(1);
  });

  it('should expose the objective list coming from the service', () => {
    // Assegura que o stream do componente usa o mesmo dado do serviço.
    expect(component.objectiveList$).toBe(objectiveService.objectiveList$);
  });

  it('should expose the mobile state from the window service', () => {
    // Valida que o status de mobile do template provém do serviço responsável.
    expect(component.isMobile$).toBe(windowSizeService.isMobile$);
  });
});
