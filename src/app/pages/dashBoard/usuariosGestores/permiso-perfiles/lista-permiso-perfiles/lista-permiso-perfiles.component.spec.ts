import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPermisoPerfilesComponent } from './lista-permiso-perfiles.component';

describe('ListaPermisoPerfilesComponent', () => {
  let component: ListaPermisoPerfilesComponent;
  let fixture: ComponentFixture<ListaPermisoPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPermisoPerfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPermisoPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
