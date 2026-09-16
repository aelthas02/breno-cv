import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsService } from '../../services/skills.service';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    // Prepara o serviço de skills com dados estáveis para o ciclo de inicialização do componente.
    const skillsServiceMock = {
      getSkillsList: jest.fn().mockReturnValue(of([])),
      skillList$: of([]),
      loading$: of(false),
    } as unknown as jest.Mocked<SkillsService>;

    // Configura o componente standalone com rota e serviço mockados para o teste de criação.
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [
        { provide: SkillsService, useValue: skillsServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica que o componente consegue inicializar sem depender do backend real.
    expect(component).toBeTruthy();
  });
});
