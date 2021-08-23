import { TestBed } from '@angular/core/testing';

import { PlaceResolverService } from './place-resolver.service';

describe('PlaceResolverService', () => {
  let service: PlaceResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
