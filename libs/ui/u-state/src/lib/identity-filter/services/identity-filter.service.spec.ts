import { TestBed } from '@angular/core/testing';

import { IdentityFilterService } from './identity-filter.service';

describe('IdentityFilterService', () => {
  let service: IdentityFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
