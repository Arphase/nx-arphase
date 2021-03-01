import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFormContainerComponent } from './vehicle-form-container.component';

describe('VehicleFormContainerComponent', () => {
  let component: VehicleFormContainerComponent;
  let fixture: ComponentFixture<VehicleFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
