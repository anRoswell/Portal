import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoContratacionComponent } from './proceso-contratacion.component';

describe('ProcesoContratacionComponent', () => {
  let component: ProcesoContratacionComponent;
  let fixture: ComponentFixture<ProcesoContratacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoContratacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoContratacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
