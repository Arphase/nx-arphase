import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationListContainerComponent } from './reservation-list-container.component';

describe('ReservationListContainerComponent', () => {
  let component: ReservationListContainerComponent;
  let fixture: ComponentFixture<ReservationListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
