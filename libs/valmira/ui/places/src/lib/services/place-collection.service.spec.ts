import { TestBed } from '@angular/core/testing';

import { PlaceCollectionService } from './place-collection.service';

describe('PlaceCollectionService', () => {
  let service: PlaceCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
