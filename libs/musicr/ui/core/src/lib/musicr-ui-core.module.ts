import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  imports: [CommonModule],
  exports: [MenuModule, FooterModule],
})
export class MusicrUiCoreModule {}
