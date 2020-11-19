import { TestBed } from '@angular/core/testing';

import { GroupCollectionService } from './group-collection.service';

describe('GroupCollectionService', () => {
  let service: GroupCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
