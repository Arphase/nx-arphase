import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApsCollectionResponseInfo } from '@arphase/common';
import { ApsColumns } from '@arphase/ui/core';
import { Product } from '@innovatech/common/domain';
import { TransferDirection, TransferItem } from 'ng-zorro-antd/transfer';

function mapTransferItems(products: Product[], direction: TransferDirection): TransferItem[] {
  return products.map(product => ({
    key: product.id,
    title: product.name,
    description: product.logo,
    direction,
  }));
}

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
  @Input() info: ApsCollectionResponseInfo;
  transferData: TransferItem[] = [];
  columns: ApsColumns = [
    {
      label: 'Nombre',
      prop: 'product.name',
      colSizes: {
        xs: 16,
        md: 11,
      },
    },
    {
      label: 'Logo',
      prop: 'product.logo',
      colSizes: {
        xs: 0,
        md: 10,
      },
    },
  ];
  @Output() submitData = new EventEmitter<number[]>();
  @Output() filterItems = new EventEmitter<unknown>();

  get total(): number {
    return this?.info?.total || 0;
  }

  get pageIndex(): number {
    return this?.info?.pageIndex || 1;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.groupProducts && this.groupProducts) {
      this.transferData = [...this.transferData, ...mapTransferItems(this.groupProducts, 'right')];
    }
    if (changes.products && this.products) {
      const selectedData = this.transferData?.filter(item => item.direction === 'right') || [];
      const groupProductName = selectedData?.map(product => product.title) || [];
      this.transferData = [
        ...selectedData,
        ...mapTransferItems(this.products, 'left').filter(item => !groupProductName.includes(item.title)),
      ];
    }
  }

  submit(): void {
    this.submitData.emit(this.transferData.filter(item => item.direction === 'right').map(item => item.key));
  }
}
