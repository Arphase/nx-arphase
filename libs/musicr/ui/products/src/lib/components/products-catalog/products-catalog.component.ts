import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ApsCollectionResponseInfo } from '@arphase/common';
import { Product } from '@musicr/domain';
import { QueryParams } from '@ngrx/data';

@Component({
  selector: 'mrl-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCatalogComponent {
  @Input() products: Product[];
  @Input() info: ApsCollectionResponseInfo;
  @Input() title: string;
  @Input() loading: boolean;
  @Input() loadingMore: boolean;
  mockArray = new Array(8);
  @Output() loadMore = new EventEmitter<QueryParams>();

  onLoadMore() {
    this.loadMore.emit({ pageIndex: String(this.info.pageIndex + 1) });
  }
}
