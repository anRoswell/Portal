import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoyproveedorComponent } from './soyproveedor.component';

describe('SoyproveedorComponent', () => {
  let component: SoyproveedorComponent;
  let fixture: ComponentFixture<SoyproveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoyproveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoyproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
