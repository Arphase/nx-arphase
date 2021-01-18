import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListContainerComponent } from './vehicle-list-container.component';

describe('VehicleListContainerComponent', () => {
  let component: VehicleListContainerComponent;
  let fixture: ComponentFixture<VehicleListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
