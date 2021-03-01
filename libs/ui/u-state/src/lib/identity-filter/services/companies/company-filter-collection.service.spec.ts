import { TestBed } from '@angular/core/testing';

import { CompanyFilterCollectionService } from './company-filter-collection.service';

describe('CompanyFilterCollectionService', () => {
  let service: CompanyFilterCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyFilterCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
