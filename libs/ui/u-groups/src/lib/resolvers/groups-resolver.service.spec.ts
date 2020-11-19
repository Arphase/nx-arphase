import { TestBed } from '@angular/core/testing';

import { GroupsResolverService } from './Groups-resolver.service';

describe('GroupsResolverService', () => {
  let service: GroupsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
