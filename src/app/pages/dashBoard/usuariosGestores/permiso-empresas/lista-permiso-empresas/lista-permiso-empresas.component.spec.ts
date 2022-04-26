import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPermisoEmpresasComponent } from './lista-permiso-empresas.component';

describe('ListaPermisoEmpresasComponent', () => {
  let component: ListaPermisoEmpresasComponent;
  let fixture: ComponentFixture<ListaPermisoEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPermisoEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPermisoEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
