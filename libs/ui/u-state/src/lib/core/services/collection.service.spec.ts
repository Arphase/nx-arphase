import { TestBed } from '@angular/core/testing';

import { IvtCollectionService } from './collection.service';

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
