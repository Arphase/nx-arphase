import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApsAutocompleteDirective } from './autocomplete.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ApsAutocompleteDirective],
  exports: [ApsAutocompleteDirective],
})
export class ApsAutocompleteModule {}
