import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionCertificadosComponent } from './generacion-certificados.component';

describe('GeneracionCertificadosComponent', () => {
  let component: GeneracionCertificadosComponent;
  let fixture: ComponentFixture<GeneracionCertificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneracionCertificadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneracionCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
