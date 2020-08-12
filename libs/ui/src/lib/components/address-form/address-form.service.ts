import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Locality, Select } from '@ivt/data';
import { IVT_STATE_CONFIGURATION, IvtStateConfiguration } from '@ivt/state';
import { sortSelectOptions } from '@ivt/utils';
import { uniqBy } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface MappedLocalities {
  showAddressSelects: boolean;
  countryOptions: Select[];
  stateOptions: Select[];
  cityOptions: Select[];
  suburbOptions: Select[];
}

@Injectable()
export class IvtAddressFormService {
  constructor(
    private http: HttpClient,
    @Inject(IVT_STATE_CONFIGURATION) public config: IvtStateConfiguration
  ) {}

  getLocalities(zipCode: string): Observable<Locality[]> {
    return this.http
      .get<Locality[]>(`${this.config.apiUrl}/localities/${zipCode}`)
      .pipe(catchError(() => of([])));
  }

  mapLocalities(localities: Locality[]): MappedLocalities {
    const showAddressSelects = localities.length > 0;
    const countryOptions = showAddressSelects
      ? [{ value: 'México', label: 'México' }]
      : [];
    const stateOptions = sortSelectOptions(
      this.mapOptions(localities, (info) => ({
        label: info.state,
        value: info.state,
      }))
    );
    const cityOptions = sortSelectOptions(
      this.mapOptions(localities, (info) => ({
        label: info.city,
        value: info.city,
      }))
    );
    const suburbOptions = sortSelectOptions(
      this.mapOptions(localities, (info) => ({
        label: info.suburb,
        value: info.suburb,
      }))
    );

    return {
      showAddressSelects,
      countryOptions,
      stateOptions,
      cityOptions,
      suburbOptions,
    };
  }

  private mapOptions(
    zipCodeInfo: Locality[],
    mappingFn: (info: Locality) => Select
  ) {
    return uniqBy(zipCodeInfo.map(mappingFn), 'value');
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
