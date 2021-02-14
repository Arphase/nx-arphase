import { NgModule } from '@angular/core';

import { IvtAddressFormModule } from './address-form';
import { IvtAutocompleteModule } from './autocomplete';
import { IvtCheckboxFilterModule, IvtDateFilterModule, IvtFilterModule, IvtRadioFilterModule } from './filters';
import { IvtFormModule } from './form';
import { IvtListModule } from './list';
import { IvtSearchbarModule } from './searchbar';
import { IvtStatusMessageModule } from './status-message';
import { IvtSubscriberModule } from './subscriber';
import { IvtTableModule } from './table';
import { IvtVirtualScrollModule } from './virtual-scroll';

const MODULES = [
  IvtAddressFormModule,
  IvtAutocompleteModule,
  IvtCheckboxFilterModule,
  IvtDateFilterModule,
  IvtFilterModule,
  IvtFormModule,
  IvtListModule,
  IvtRadioFilterModule,
  IvtSearchbarModule,
  IvtStatusMessageModule,
  IvtSubscriberModule,
  IvtTableModule,
  IvtVirtualScrollModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
