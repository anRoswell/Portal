import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionCarteraComponent } from './facturacion-cartera.component';

describe('FacturacionCarteraComponent', () => {
  let component: FacturacionCarteraComponent;
  let fixture: ComponentFixture<FacturacionCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturacionCarteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
