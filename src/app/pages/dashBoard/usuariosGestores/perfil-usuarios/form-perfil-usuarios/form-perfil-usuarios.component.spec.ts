import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfilUsuariosComponent } from './form-perfil-usuarios.component';

describe('FormPerfilUsuariosComponent', () => {
  let component: FormPerfilUsuariosComponent;
  let fixture: ComponentFixture<FormPerfilUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPerfilUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPerfilUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
