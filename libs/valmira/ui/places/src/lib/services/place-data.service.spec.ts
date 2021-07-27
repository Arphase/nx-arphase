import { TestBed } from '@angular/core/testing';

import { PlaceDataService } from './place-data.service';

describe('PlaceDataService', () => {
  let service: PlaceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
