import { TestBed } from '@angular/core/testing';

import { GuaranteeDataService } from './guarantee-data.service';

describe('GuaranteeDataService', () => {
  let service: GuaranteeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuaranteeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
