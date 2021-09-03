import { AfterContentInit, ChangeDetectorRef, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsCollectionSelectDirective } from '@arphase/ui/core';
import { Product } from '@innovatech/common/domain';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[ivtProductSelect]',
})
export class ProductSelectDirective
  extends ApsCollectionSelectDirective<Product>
  implements OnChanges, AfterContentInit
{
  @Input() year: string;
  @Input() horsePower: string;
  sortValue = [{ key: 'product.name', value: 'ascend' }];

  constructor(
    protected host: NzSelectComponent,
    protected productCollectionService: ProductCollectionService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef
  ) {
    super(host, productCollectionService, ngControl, cdr);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.year || changes.horsePower) {
      this.getProductsWithRestrictions();
    }
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    this.getProductsWithRestrictions();
  }

  getProductsWithRestrictions(): void {
    if (this.year && this.horsePower) {
      this.productCollectionService.queryParams$.pipe(take(1)).subscribe(queryParams =>
        this.productCollectionService.getWithQuery({
          ...queryParams,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sort: this.sortValue as any,
          year: this.year,
          horsePower: this.horsePower,
          resetList: String(true),
        })
      );
    }
  }
}
