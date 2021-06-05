import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Address } from '@innovatech/common/domain';
import { IvtFormComponent } from '@innovatech/ui/core/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { createAddressForm, IvtAddressFormService } from './address-form.service';

@UntilDestroy()
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
        untilDestroyed(this),
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
