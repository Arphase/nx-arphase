import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from './uppercase.directive';

const directives = [
  UppercaseDirective
];

@NgModule({
  declarations: [directives],
  imports: [
    CommonModule
  ],
  exports: [directives]
})
export class DirectivesModule { }
