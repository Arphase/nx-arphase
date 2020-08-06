import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Address } from '@ivt/data';
import { of } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { IvtFormComponent } from '../form';
import {
  createAddressForm,
  IvtAddressFormService,
} from './address-form.service';

@Component({
  selector: 'ivt-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IvtAddressFormService],
})
export class IvtAddressFormComponent extends IvtFormComponent<Address>
  implements OnInit {
  showAddressSelects: boolean;

  constructor(private addressFormService: IvtAddressFormService) {
    super();
    this.form = createAddressForm();
  }

  ngOnInit(): void {
    this.form
      .get('zipcode')
      .valueChanges.pipe(
        filter((value) => value && value.length === 5),
        takeUntil(this.destroy$),
        switchMap((zipcode) => this.addressFormService.getZipCodeInfo(zipcode)),
        catchError((e) => of(true))
      )
      .subscribe((zipCodeResponse) => console.log(zipCodeResponse));
  }
}
