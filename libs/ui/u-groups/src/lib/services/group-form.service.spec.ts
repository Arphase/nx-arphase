import { TestBed } from '@angular/core/testing';

import { GroupFormService } from './group-form.service';

describe('GroupFormService', () => {
  let service: GroupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
