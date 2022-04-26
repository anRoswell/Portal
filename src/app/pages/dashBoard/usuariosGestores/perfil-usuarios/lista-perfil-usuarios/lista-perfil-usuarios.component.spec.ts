import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuariosComponent } from './lista-perfil-usuarios.component';

describe('PermisoUsuariosComponent', () => {
  let component: PerfilUsuariosComponent;
  let fixture: ComponentFixture<PerfilUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
