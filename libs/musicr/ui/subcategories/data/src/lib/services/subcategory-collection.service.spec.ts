import { TestBed } from '@angular/core/testing';

import { SubcategoryCollectionService } from './subcategory-collection.service';

describe('SubcategoryCollectionService', () => {
  let service: SubcategoryCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoryCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
