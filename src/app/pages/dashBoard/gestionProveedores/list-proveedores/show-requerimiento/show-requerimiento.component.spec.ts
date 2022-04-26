import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRequerimientoComponent } from './show-requerimiento.component';

describe('ShowRequerimientoComponent', () => {
  let component: ShowRequerimientoComponent;
  let fixture: ComponentFixture<ShowRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRequerimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
