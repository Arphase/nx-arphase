import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Locality, Select } from '@ivt/c-data';
import { sortSelectOptions, sortStringOptions } from '@ivt/c-utils';
import { IVT_UI_STATE_CONFIGURATION, IvtUiStateConfiguration } from '@ivt/u-state';
import { uniq, uniqBy } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface MappedLocalities {
  showAddressSelects: boolean;
  countryOptions: Select[];
  stateOptions: Select[];
  cityOptions: Select[];
  suburbOptions: string[];
}

@Injectable()
export class IvtAddressFormService {
  constructor(private http: HttpClient, @Inject(IVT_UI_STATE_CONFIGURATION) public config: IvtUiStateConfiguration) {}

  getLocalities(zipcode: string): Observable<Locality[]> {
    return this.http.get<Locality[]>(`${this.config.apiUrl}/localities/${zipcode}`).pipe(catchError(() => of([])));
  }

  mapLocalities(localities: Locality[]): MappedLocalities {
    const showAddressSelects = localities.length > 0;
    const countryOptions = showAddressSelects ? [{ value: 'México', label: 'México' }] : [];
    const stateOptions = sortSelectOptions(
      this.mapOptions(localities, info => ({
        label: info.state,
        value: info.state,
      }))
    );
    const cityOptions = sortSelectOptions(
      this.mapOptions(localities, info => ({
        label: info.city,
        value: info.city,
      }))
    );
    const suburbOptions = sortStringOptions(this.mapStringOptions(localities, info => info.suburb));

    return {
      showAddressSelects,
      countryOptions,
      stateOptions,
      cityOptions,
      suburbOptions,
    };
  }

  private mapOptions(zipCodeInfo: Locality[], mappingFn: (info: Locality) => Select) {
    return uniqBy(zipCodeInfo.map(mappingFn), 'value');
  }

  private mapStringOptions(zipCodeInfo: Locality[], mappingFn: (info: Locality) => string) {
    return uniq(zipCodeInfo.map(mappingFn));
  }
}

export function createAddressForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    zipcode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    suburb: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    externalNumber: new FormControl('', Validators.required),
    internalNumber: new FormControl(),
  });
}
