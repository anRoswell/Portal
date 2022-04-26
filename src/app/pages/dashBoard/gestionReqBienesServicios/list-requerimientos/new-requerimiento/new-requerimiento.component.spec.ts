import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequerimientoComponent } from './new-requerimiento.component';

describe('NewRequerimientoComponent', () => {
  let component: NewRequerimientoComponent;
  let fixture: ComponentFixture<NewRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRequerimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
