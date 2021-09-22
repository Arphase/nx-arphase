import { TestBed } from '@angular/core/testing';

import { ReservationWizardService } from './reservation-wizard.service';

describe('ReservationWizardService', () => {
  let service: ReservationWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
