import { TestBed } from '@angular/core/testing';

import { CompanyCollectionService } from './company-collection.service';

describe('CompanyCollectionService', () => {
  let service: CompanyCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
