import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsComponent { }
