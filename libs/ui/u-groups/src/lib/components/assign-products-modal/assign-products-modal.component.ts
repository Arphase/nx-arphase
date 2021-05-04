import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Product } from '@ivt/c-data';
import { TransferItem } from 'ng-zorro-antd/transfer';

@Component({
  selector: 'ivt-assign-products-modal',
  templateUrl: './assign-products-modal.component.html',
  styleUrls: ['./assign-products-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignProductsModalComponent implements OnChanges {
  @Input() products: Product[];
  @Input() groupProducts: Product[];
  @Input() loading: boolean;
  transferData: TransferItem[] = [];
  @Output() submitData = new EventEmitter<number[]>();

  ngOnChanges() {
    if (this.products && this.groupProducts) {
      this.transferData = this.products.map(product => ({
        key: product.id,
        title: product.name,
        description: product.logo,
        direction: this.groupProducts.find(groupProduct => groupProduct.id === product.id) ? 'right' : undefined,
      }));
    }
  }

  submit(): void {
    this.submitData.emit(this.transferData.filter(item => item.direction === 'right').map(item => item.key));
  }
}
