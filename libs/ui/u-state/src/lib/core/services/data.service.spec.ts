import { TestBed } from '@angular/core/testing';

import { IvtDataService } from './data.service';

describe('IvtDataService', () => {
  let service: IvtDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IvtDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
