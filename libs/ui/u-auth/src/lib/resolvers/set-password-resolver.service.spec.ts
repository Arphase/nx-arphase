import { TestBed } from '@angular/core/testing';

import { SetPasswordResolverService } from './set-password-resolver.service';

describe('SetPasswordResolverService', () => {
  let service: SetPasswordResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetPasswordResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
