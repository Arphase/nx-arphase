import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vma-additional-products',
  templateUrl: './additional-products.component.html',
  styleUrls: ['./additional-products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalProductsComponent {}
