import { NgModule } from '@angular/core';

import { IvtAddressFormModule } from './address-form';
import { IvtAutocompleteModule } from './autocomplete';
import { IvtCheckboxFilterModule, IvtDateFilterModule, IvtRadioFilterModule } from './filters';
import { IvtFormModule } from './form';
import { IvtListModule } from './list';
import { IvtSearchbarModule } from './searchbar';
import { IvtStatusMessageModule } from './status-message';
import { IvtSubscriberModule } from './subscriber';

const MODULES = [
  IvtAddressFormModule,
  IvtAutocompleteModule,
  IvtCheckboxFilterModule,
  IvtDateFilterModule,
  IvtFormModule,
  IvtListModule,
  IvtRadioFilterModule,
  IvtSearchbarModule,
  IvtStatusMessageModule,
  IvtSubscriberModule,
  ,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
