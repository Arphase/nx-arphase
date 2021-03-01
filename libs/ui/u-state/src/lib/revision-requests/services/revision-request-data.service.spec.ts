import { TestBed } from '@angular/core/testing';

import { RevisionRequestDataService } from './revision-request-data.service';

describe('RevisionRequestDataService', () => {
  let service: RevisionRequestDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionRequestDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
