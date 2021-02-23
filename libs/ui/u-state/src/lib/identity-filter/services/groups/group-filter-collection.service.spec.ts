import { TestBed } from '@angular/core/testing';

import { GroupFilterCollectionService } from './group-filter-collection.service';

describe('GroupFilterCollectionService', () => {
  let service: GroupFilterCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupFilterCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
