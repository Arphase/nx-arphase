import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsValidators, sortSelectOptions, sortStringOptions } from '@arphase/ui';
import { Locality } from '@innovatech/common/domain';
import { uniq, uniqBy } from 'lodash-es';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface MappedLocalities {
  showAddressSelects: boolean;
  countryOptions: NzSelectOptionInterface[];
  stateOptions: NzSelectOptionInterface[];
  cityOptions: NzSelectOptionInterface[];
  suburbOptions: string[];
}

@Injectable()
export class IvtAddressFormService {
  constructor(private http: HttpClient) {}

  getLocalities(zipcode: string): Observable<Locality[]> {
    return this.http.get<Locality[]>(`/ivtApi/localities/${zipcode}`).pipe(catchError(() => of([])));
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

  private mapOptions(zipCodeInfo: Locality[], mappingFn: (info: Locality) => NzSelectOptionInterface) {
    return uniqBy(zipCodeInfo.map(mappingFn), 'value');
  }

  private mapStringOptions(zipCodeInfo: Locality[], mappingFn: (info: Locality) => string) {
    return uniq(zipCodeInfo.map(mappingFn));
  }
}

export function createAddressForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    zipcode: new FormControl('', [ApsValidators.required, ApsValidators.minLength(5), ApsValidators.maxLength(5)]),
    country: new FormControl('', ApsValidators.required),
    state: new FormControl('', ApsValidators.required),
    city: new FormControl('', ApsValidators.required),
    suburb: new FormControl('', ApsValidators.required),
    street: new FormControl('', ApsValidators.required),
    externalNumber: new FormControl('', ApsValidators.required),
    internalNumber: new FormControl(),
  });
}
