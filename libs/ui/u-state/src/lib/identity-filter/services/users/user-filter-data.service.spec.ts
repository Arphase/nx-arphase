import { TestBed } from '@angular/core/testing';

import { UserFilterDataService } from './user-filter-data.service';

describe('UserFilterDataService', () => {
  let service: UserFilterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFilterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
