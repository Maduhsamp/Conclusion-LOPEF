import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarrelatoriosComponent } from './editarrelatorios.component';

describe('EditarrelatoriosComponent', () => {
  let component: EditarrelatoriosComponent;
  let fixture: ComponentFixture<EditarrelatoriosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarrelatoriosComponent]
    });
    fixture = TestBed.createComponent(EditarrelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
