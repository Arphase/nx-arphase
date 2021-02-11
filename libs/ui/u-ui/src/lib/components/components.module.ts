import { NgModule } from '@angular/core';

import { IvtAddressFormModule } from './address-form';
import { IvtAutocompleteModule } from './autocomplete';
import { IvtConfirmationDialogModule } from './confirmation-dialog';
import { IvtFileUploadModule } from './file-upload';
import { IvtCheckboxFilterModule, IvtDateFilterModule, IvtFilterModule, IvtRadioFilterModule } from './filters';
import { IvtFormModule } from './form';
import { IvtListModule } from './list';
import { IvtRowModule } from './row';
import { IvtSearchbarModule } from './searchbar';
import { IvtStatusMessageModule } from './status-message';
import { IvtSubscriberModule } from './subscriber';
import { IvtSuccessDialogModule } from './success-dialog';
import { IvtTableModule } from './table';
import { IvtTextTruncateTooltipModule } from './text-truncate-tooltip';
import { IvtVirtualScrollModule } from './virtual-scroll';

const MODULES = [
  IvtAddressFormModule,
  IvtAutocompleteModule,
  IvtCheckboxFilterModule,
  IvtConfirmationDialogModule,
  IvtDateFilterModule,
  IvtFileUploadModule,
  IvtFilterModule,
  IvtFormModule,
  IvtListModule,
  IvtRadioFilterModule,
  IvtRowModule,
  IvtSearchbarModule,
  IvtStatusMessageModule,
  IvtSubscriberModule,
  IvtSuccessDialogModule,
  IvtTableModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
