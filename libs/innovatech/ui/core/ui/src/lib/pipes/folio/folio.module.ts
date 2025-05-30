import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtFolioPipe } from './folio.pipe';

@NgModule({
  declarations: [IvtFolioPipe],
  imports: [CommonModule],
  exports: [IvtFolioPipe],
  providers: [IvtFolioPipe],
})
export class IvtFolioModule {}
