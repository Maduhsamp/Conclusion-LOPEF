import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarrelatorioComponent } from './criarrelatorio.component';

describe('CriarrelatorioComponent', () => {
  let component: CriarrelatorioComponent;
  let fixture: ComponentFixture<CriarrelatorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarrelatorioComponent]
    });
    fixture = TestBed.createComponent(CriarrelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
