import { TestBed } from '@angular/core/testing';

import { GuaranteeCollectionService } from './guarantee-collection.service';

describe('GuaranteeCollectionService', () => {
  let service: GuaranteeCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuaranteeCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
