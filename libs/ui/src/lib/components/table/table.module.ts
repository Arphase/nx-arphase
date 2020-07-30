import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvtTableHeaderModule } from './table-header';
import { IvtTableHeaderColumnModule } from './table-header-column';



@NgModule({
  imports: [IvtTableHeaderModule, IvtTableHeaderColumnModule],
  exports: [IvtTableHeaderModule, IvtTableHeaderColumnModule]
})
export class IvtTableModule { }
