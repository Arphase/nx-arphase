import { TestBed } from '@angular/core/testing';

import { GuaranteeResolverService } from './guarantee-resolver.service';

describe('GuaranteeResolverService', () => {
  let service: GuaranteeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuaranteeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
