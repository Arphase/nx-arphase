import { NgModule } from '@angular/core';

import { IvtAddressFormModule } from './address-form';
import { IvtCheckboxFilterModule, IvtDateFilterModule, IvtRadioFilterModule } from './filters';
import { IvtFormModule } from './form';
import { IvtListModule } from './list';
import { IvtSearchbarModule } from './searchbar';
import { IvtStatusMessageModule } from './status-message';

const MODULES = [
  IvtAddressFormModule,
  IvtCheckboxFilterModule,
  IvtDateFilterModule,
  IvtFormModule,
  IvtListModule,
  IvtRadioFilterModule,
  IvtSearchbarModule,
  IvtStatusMessageModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
