import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPermisoPerfilesComponent } from './form-permiso-perfiles.component';

describe('FormPermisoPerfilesComponent', () => {
  let component: FormPermisoPerfilesComponent;
  let fixture: ComponentFixture<FormPermisoPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPermisoPerfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPermisoPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
