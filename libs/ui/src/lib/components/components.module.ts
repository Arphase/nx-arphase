import { NgModule } from '@angular/core';

import { IvtAddressFormModule } from './address-form';
import { IvtConfirmationDialogModule } from './confirmation-dialog';
import { IvtEmptyStateModule } from './empty-state';
import { IvtExpansionPanelModule } from './expansion-panel';
import { IvtFilterModule } from './filters';
import { IvtDateFilterModule } from './filters/date-filter';
import { IvtFormModule } from './form';
import { IvtFormFieldModule } from './form-field';
import { IvtGoBackTitleModule } from './go-back-title';
import { IvtListModule } from './list';
import { IvtNavbarModule } from './navbar';
import { IvtRowModule } from './row';
import { IvtSearchbarModule } from './searchbar';
import { IvtSubscriberModule } from './subscriber';
import { IvtTableModule } from './table';
import { IvtVirtualScrollModule } from './virtual-scroll';

const MODULES = [
  IvtAddressFormModule,
  IvtConfirmationDialogModule,
  IvtDateFilterModule,
  IvtEmptyStateModule,
  IvtExpansionPanelModule,
  IvtFilterModule,
  IvtFormModule,
  IvtFormFieldModule,
  IvtGoBackTitleModule,
  IvtListModule,
  IvtNavbarModule,
  IvtRowModule,
  IvtSearchbarModule,
  IvtSubscriberModule,
  IvtTableModule,
  IvtVirtualScrollModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
