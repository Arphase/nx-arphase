import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsComponent { }
