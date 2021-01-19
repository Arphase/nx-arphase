import { TestBed } from '@angular/core/testing';

import { RevisionsResolverService } from './revisions-resolver.service';

describe('RevisionsResolverService', () => {
  let service: RevisionsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
