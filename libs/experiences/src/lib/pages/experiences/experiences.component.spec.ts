import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceService } from '../../services/experiences.service';
import { ExperiencesComponent } from './experiences.component';

describe('ExperiencesComponent', () => {
  let component: ExperiencesComponent;
  let fixture: ComponentFixture<ExperiencesComponent>;

  beforeEach(async () => {
    // Prepara o serviço de experiências com dados vazios para evitar dependência do backend.
    const experienceServiceMock = {
      getExperienceList: jest.fn().mockReturnValue(of([])),
      experienceList$: of([]),
      loading$: of(false),
    } as unknown as jest.Mocked<ExperienceService>;

    // Configura o componente standalone com roteamento e serviço mockado.
    await TestBed.configureTestingModule({
      imports: [ExperiencesComponent],
      providers: [
        { provide: ExperienceService, useValue: experienceServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica que o componente foi criado sem erros de injeção de dependência.
    expect(component).toBeTruthy();
  });
});
