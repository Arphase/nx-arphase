import { TestBed } from '@angular/core/testing';

import { RevisionRequestCollectionService } from './revision-request-collection.service';

describe('RevisionRequestCollectionService', () => {
  let service: RevisionRequestCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionRequestCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
