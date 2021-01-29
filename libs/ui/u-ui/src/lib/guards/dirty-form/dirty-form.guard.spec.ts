import { TestBed } from '@angular/core/testing';

import { IvtDirtyFormGuard } from './dirty-form.guard';

describe('IvtDirtyFormGuard', () => {
  let guard: IvtDirtyFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IvtDirtyFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
