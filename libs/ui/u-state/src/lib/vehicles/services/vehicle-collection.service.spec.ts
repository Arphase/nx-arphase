import { TestBed } from '@angular/core/testing';

import { VehicleCollectionService } from './vehicle-collection.service';

describe('VehicleCollectionService', () => {
  let service: VehicleCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
