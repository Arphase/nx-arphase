import { NgModule } from '@angular/core';

import { IvtAddressFormModule } from './address-form';
import { IvtAutocompleteModule } from './autocomplete';
import { IvtConfirmationDialogModule } from './confirmation-dialog';
import { IvtEmptyStateModule } from './empty-state';
import { IvtExpansionPanelModule } from './expansion-panel';
import { IvtFileUploadModule } from './file-upload';
import { IvtDateFilterModule, IvtFilterModule, IvtRadioFilterModule } from './filters';
import { IvtFormModule } from './form';
import { IvtFormFieldModule } from './form-field';
import { IvtGoBackTitleModule } from './go-back-title';
import { IvtListModule } from './list';
import { IvtNavbarModule } from './navbar';
import { IvtRowModule } from './row';
import { IvtSearchbarModule } from './searchbar';
import { IvtSubscriberModule } from './subscriber';
import { IvtTableModule } from './table';
import { IvtTextTruncateTooltipModule } from './text-truncate-tooltip';
import { IvtVirtualScrollModule } from './virtual-scroll';

const MODULES = [
  IvtAddressFormModule,
  IvtAutocompleteModule,
  IvtConfirmationDialogModule,
  IvtDateFilterModule,
  IvtEmptyStateModule,
  IvtExpansionPanelModule,
  IvtFileUploadModule,
  IvtFilterModule,
  IvtFormModule,
  IvtFormFieldModule,
  IvtGoBackTitleModule,
  IvtListModule,
  IvtNavbarModule,
  IvtRadioFilterModule,
  IvtRowModule,
  IvtSearchbarModule,
  IvtSubscriberModule,
  IvtTableModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
