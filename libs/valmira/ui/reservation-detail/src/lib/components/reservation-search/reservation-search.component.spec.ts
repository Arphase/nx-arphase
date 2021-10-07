import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ReservationSearchComponent } from './reservation-search.component';

describe('ReservationSearchComponent', () => {
  let spectator: Spectator<ReservationSearchComponent>;
  const createComponent = createComponentFactory({
    component: ReservationSearchComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
