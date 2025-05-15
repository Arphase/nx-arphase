import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Address } from '@arphase/common';
import { ApsFormComponent } from '@arphase/ui/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { ApsAddressFormService, createAddressForm } from './address-form.service';

@UntilDestroy()
@Component({
    selector: 'aps-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApsAddressFormService],
    standalone: false
})
export class ApsAddressFormComponent extends ApsFormComponent<Address> implements OnInit {
  @Input() placeholders: Address = {
    zipcode: '',
    country: '',
    state: '',
    city: '',
    suburb: '',
    street: '',
    externalNumber: '',
    internalNumber: '',
  };

  override form = createAddressForm();
  showAddressSelects: boolean;
  countryOptions: NzSelectOptionInterface[] = [];
  stateOptions: NzSelectOptionInterface[] = [];
  cityOptions: NzSelectOptionInterface[] = [];
  suburbOptions: string[] = [];

  constructor(private addressFormService: ApsAddressFormService, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    const zipCodeControl = this.form.get('zipcode') as FormControl;

    zipCodeControl.valueChanges
      .pipe(
        startWith(zipCodeControl.value),
        filter(value => value && String(value).length === 5),
        untilDestroyed(this),
        switchMap(zipcode => this.addressFormService.getLocalities(zipcode))
      )
      .subscribe(zipCodeResponse => {
        const { showAddressSelects, countryOptions, stateOptions, cityOptions, suburbOptions } =
          this.addressFormService.mapLocalities(zipCodeResponse);
        this.showAddressSelects = showAddressSelects;
        this.countryOptions = countryOptions;
        this.stateOptions = stateOptions;
        this.cityOptions = cityOptions;
        this.suburbOptions = suburbOptions;
        this.cdr.detectChanges();
      });
  }
}
