import { TestBed } from '@angular/core/testing';

import { PaymentOrderCollectionService } from './payment-order-collection.service';

describe('PaymentOrderCollectionService', () => {
  let service: PaymentOrderCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentOrderCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
