import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarmeProveedorComponent } from './registrarme-proveedor.component';

describe('RegistrarmeProveedorComponent', () => {
  let component: RegistrarmeProveedorComponent;
  let fixture: ComponentFixture<RegistrarmeProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarmeProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarmeProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
