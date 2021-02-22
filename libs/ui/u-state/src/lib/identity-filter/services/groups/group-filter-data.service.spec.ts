import { TestBed } from '@angular/core/testing';

import { GroupFilterDataService } from './group-filter-data.service';

describe('GroupFilterDataService', () => {
  let service: GroupFilterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupFilterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
