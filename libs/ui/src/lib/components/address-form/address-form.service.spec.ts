import { TestBed } from '@angular/core/testing';

import { IvtAddressFormService } from './address-form.service';

describe('IvtAddressFormService', () => {
  let service: IvtAddressFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IvtAddressFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
