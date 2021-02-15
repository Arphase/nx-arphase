import { TestBed } from '@angular/core/testing';

import { RevisionRequestResolverService } from './revision-request-resolver.service';

describe('RevisionRequestResolverService', () => {
  let service: RevisionRequestResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionRequestResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
