import { AfterContentInit, ChangeDetectorRef, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ApsCollectionSelectDirective } from '@arphase/ui/core';
import { Product } from '@innovatech/common/domain';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[ivtProductSelect]',
  standalone: false,
})
export class ProductSelectDirective
  extends ApsCollectionSelectDirective<Product>
  implements OnChanges, AfterContentInit
{
  @Input() year: string;
  @Input() horsePower: string;
  @Input() groupId: number;
  sortValue = [{ key: 'product.name', value: 'ascend' }];

  constructor(
    protected host: NzSelectComponent,
    protected productCollectionService: ProductCollectionService,
    protected ngControl: NgControl,
    protected cdr: ChangeDetectorRef,
  ) {
    super(host, productCollectionService, ngControl, cdr);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.year || changes.horsePower || changes.groupId) {
      this.getProductsWithRestrictions();
    }
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    this.getProductsWithRestrictions();
  }

  getProductsWithRestrictions(): void {
    this.productCollectionService.queryParams$.pipe(take(1)).subscribe(queryParams =>
      this.productCollectionService.getWithQuery({
        ...queryParams,
        sort: this.sortValue as unknown as string[],
        year: this.year ?? undefined,
        horsePower: this.horsePower ?? undefined,
        groupId: this.groupId ? String(this.groupId) : undefined,
        resetList: String(true),
      }),
    );
  }
}
