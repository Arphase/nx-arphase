import { TestBed } from '@angular/core/testing';

import { UserFilterCollectionService } from './user-filter-collection.service';

describe('UserFilterCollectionService', () => {
  let service: UserFilterCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFilterCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
