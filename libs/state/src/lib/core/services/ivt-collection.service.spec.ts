import { TestBed } from '@angular/core/testing';

import { IvtCollectionService } from './ivt-collection.service';

describe('IvtCollectionService', () => {
  let service: IvtCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IvtCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
