import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesCompraContratoComponent } from './ordenes-compra-contrato.component';

describe('OrdenesCompraContratoComponent', () => {
  let component: OrdenesCompraContratoComponent;
  let fixture: ComponentFixture<OrdenesCompraContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenesCompraContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesCompraContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
