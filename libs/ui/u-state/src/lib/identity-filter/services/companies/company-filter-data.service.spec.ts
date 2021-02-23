import { TestBed } from '@angular/core/testing';

import { CompanyFilterDataService } from './company-filter-data.service';

describe('CompanyFilterDataService', () => {
  let service: CompanyFilterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyFilterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
