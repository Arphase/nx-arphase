import { TestBed } from '@angular/core/testing';

import { SpaGuard } from './spa.guard';

describe('SpaGuard', () => {
  let guard: SpaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SpaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
