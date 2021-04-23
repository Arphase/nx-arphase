import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Address } from '@ivt/c-data';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { filter, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { IvtFormComponent } from '../form';
import { createAddressForm, IvtAddressFormService } from './address-form.service';

@Component({
  selector: 'ivt-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IvtAddressFormService],
})
export class IvtAddressFormComponent extends IvtFormComponent<Address> implements OnInit {
  form = createAddressForm();
  showAddressSelects: boolean;
  countryOptions: NzSelectOptionInterface[] = [];
  stateOptions: NzSelectOptionInterface[] = [];
  cityOptions: NzSelectOptionInterface[] = [];
  suburbOptions: string[] = [];

  constructor(private addressFormService: IvtAddressFormService, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    const zipCodeControl = this.form.get('zipcode');

    zipCodeControl.valueChanges
      .pipe(
        startWith(zipCodeControl.value),
        filter(value => value && String(value).length === 5),
        takeUntil(this.destroy$),
        switchMap(zipcode => this.addressFormService.getLocalities(zipcode))
      )
      .subscribe(zipCodeResponse => {
        const {
          showAddressSelects,
          countryOptions,
          stateOptions,
          cityOptions,
          suburbOptions,
        } = this.addressFormService.mapLocalities(zipCodeResponse);
        this.showAddressSelects = showAddressSelects;
        this.countryOptions = countryOptions;
        this.stateOptions = stateOptions;
        this.cityOptions = cityOptions;
        this.suburbOptions = suburbOptions;
        this.cdr.detectChanges();
      });
  }
}
