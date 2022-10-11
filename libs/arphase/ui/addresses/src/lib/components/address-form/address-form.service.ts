import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Locality } from '@arphase/common';
import { ApsValidators, sortSelectOptions, sortStringOptions } from '@arphase/ui/core';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

function uniq(array: any[]): any[] {
  return [...new Set(array)];
}

const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : o => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
};

export interface MappedLocalities {
  showAddressSelects: boolean;
  countryOptions: NzSelectOptionInterface[];
  stateOptions: NzSelectOptionInterface[];
  cityOptions: NzSelectOptionInterface[];
  suburbOptions: string[];
}

@Injectable()
export class ApsAddressFormService {
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

export function createAddressForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    id: new UntypedFormControl(null),
    zipcode: new UntypedFormControl('', [ApsValidators.required, ApsValidators.minLength(5), ApsValidators.maxLength(5)]),
    country: new UntypedFormControl('', ApsValidators.required),
    state: new UntypedFormControl('', ApsValidators.required),
    city: new UntypedFormControl('', ApsValidators.required),
    suburb: new UntypedFormControl('', ApsValidators.required),
    street: new UntypedFormControl('', ApsValidators.required),
    externalNumber: new UntypedFormControl('', ApsValidators.required),
    internalNumber: new UntypedFormControl(),
  });
}
