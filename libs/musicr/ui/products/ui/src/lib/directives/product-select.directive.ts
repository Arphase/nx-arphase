import { ChangeDetectorRef, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsCollectionSelectDirective } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { ProductCollectionService } from '@musicr/ui/products/data';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({
  selector: '[mrlProductSelect]',
  standalone: false,
})
export class ProductSelectDirective extends ApsCollectionSelectDirective<Product> {
  sortValue = [{ key: 'product.name', value: 'ascend' }];

  constructor(
    protected host: NzSelectComponent,
    protected productCollectionService: ProductCollectionService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef,
  ) {
    super(host, productCollectionService, ngControl, cdr);
  }
}
