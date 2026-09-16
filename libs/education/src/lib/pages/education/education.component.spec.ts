import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationService } from '../../services/education.service';
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
      loading$: of(false),
    } as unknown as jest.Mocked<EducationService>;

    // Configura o componente standalone com roteamento e serviço mockados.
    await TestBed.configureTestingModule({
      imports: [EducationComponent],
      providers: [
        { provide: EducationService, useValue: educationServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Confirma que o componente foi criado corretamente em um ambiente isolado.
    expect(component).toBeTruthy();
  });
});
