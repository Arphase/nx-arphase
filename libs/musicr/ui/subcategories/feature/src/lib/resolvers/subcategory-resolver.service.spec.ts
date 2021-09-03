import { TestBed } from '@angular/core/testing';

import { SubcategoryResolverService } from './subcategory-resolver.service';

describe('SubcategoryResolverService', () => {
  let service: SubcategoryResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoryResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
