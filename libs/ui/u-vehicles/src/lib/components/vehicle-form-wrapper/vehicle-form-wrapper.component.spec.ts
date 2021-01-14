import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormWrapperComponent } from './vehicle-form-wrapper.component';

describe('VehicleFormWrapperComponent', () => {
  let component: VehicleFormWrapperComponent;
  let fixture: ComponentFixture<VehicleFormWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleFormWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFormWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
