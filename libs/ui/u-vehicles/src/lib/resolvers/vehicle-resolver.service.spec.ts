import { TestBed } from '@angular/core/testing';

import { VehicleResolverService } from './vehicle-resolver.service';

describe('VehicleResolverService', () => {
  let service: VehicleResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
