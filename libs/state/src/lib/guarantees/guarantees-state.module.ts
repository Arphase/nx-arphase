import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { GuaranteesEffects } from './state';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([GuaranteesEffects])],
})
export class GuaranteesStateModule {}
