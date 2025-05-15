import { ChangeDetectorRef, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsDataSelectDirective } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { ProductDataService } from '@musicr/ui/products/data';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({
    selector: '[mrlProductSelect]',
    standalone: false
})
export class ProductSelectDirective extends ApsDataSelectDirective<Product> {
  labelField = 'name';
  valueField = 'id';
  sortValue = [{ key: 'product.name', value: 'ascend' }];

  constructor(
    protected host: NzSelectComponent,
    protected productDataService: ProductDataService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef
  ) {
    super(host, productDataService, ngControl, cdr);
  }
}
