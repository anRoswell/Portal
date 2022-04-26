import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionProveedorComponent } from './evaluacion-proveedor.component';

describe('EvaluacionProveedorComponent', () => {
  let component: EvaluacionProveedorComponent;
  let fixture: ComponentFixture<EvaluacionProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
