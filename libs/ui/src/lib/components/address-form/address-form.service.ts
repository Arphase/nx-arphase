import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '@ivt/state';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class IvtAddressFormService {
  constructor(
    private http: HttpClient,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {}

  getZipCodeInfo(zipCode: string): Observable<any> {
    return this.http
      .get(`${this.config.sepomexApi}/query/info_cp/${zipCode}`, {
        headers: { accept: 'application/json' },
      })
      .pipe(catchError(() => of(true)));
  }
}

export function createAddressForm(): FormGroup {
  return new FormGroup({
    zipCode: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    suburb: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    externalNumber: new FormControl('', Validators.required),
    internalNumber: new FormControl(),
  });
}
