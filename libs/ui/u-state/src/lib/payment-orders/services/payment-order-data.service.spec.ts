import { TestBed } from '@angular/core/testing';

import { PaymentOrderDataService } from './payment-order-data.service';

describe('PaymentOrderDataService', () => {
  let service: PaymentOrderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentOrderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
