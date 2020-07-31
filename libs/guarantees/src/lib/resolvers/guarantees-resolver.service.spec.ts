import { TestBed } from '@angular/core/testing';

import { GuaranteesResolverService } from './guarantees-resolver.service';

describe('GuaranteesResolverService', () => {
  let service: GuaranteesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuaranteesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
