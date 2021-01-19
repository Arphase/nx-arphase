import { TestBed } from '@angular/core/testing';

import { RevisionDataService } from './revision-data.service';

describe('RevisionDataService', () => {
  let service: RevisionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
