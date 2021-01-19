import { TestBed } from '@angular/core/testing';

import { RevisionCollectionService } from './revision-collection.service';

describe('RevisionCollectionService', () => {
  let service: RevisionCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
