import { TestBed } from '@angular/core/testing';

import { RevisionResolverService } from './revision-resolver.service';

describe('RevisionResolverService', () => {
  let service: RevisionResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
