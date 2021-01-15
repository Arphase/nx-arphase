import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRowComponent } from './vehicle-row.component';

describe('VehicleRowComponent', () => {
  let component: VehicleRowComponent;
  let fixture: ComponentFixture<VehicleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
