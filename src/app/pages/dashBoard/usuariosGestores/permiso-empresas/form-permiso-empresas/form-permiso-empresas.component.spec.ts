import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPermisoEmpresasComponent } from './form-permiso-empresas.component';

describe('FormPermisoEmpresasComponent', () => {
  let component: FormPermisoEmpresasComponent;
  let fixture: ComponentFixture<FormPermisoEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPermisoEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPermisoEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
