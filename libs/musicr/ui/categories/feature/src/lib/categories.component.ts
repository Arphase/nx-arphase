import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mrl-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {}
