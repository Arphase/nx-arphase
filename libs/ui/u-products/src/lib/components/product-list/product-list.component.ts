import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Product } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';
import { IvtColumns } from '@ivt/u-ui';

@Component({
  selector: 'ivt-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent extends IvtListComponent<Product> {

  columns: IvtColumns = [
    {
      label: 'Folio',
      prop: 'product.id',
      sortable: true,
      colSizes: {
        xs: '1',
      },
    },
    {
      label: 'Nombre',
      prop: 'product.name',
      sortable: true,
      colSizes: {
        xs: '1',
      },
    },
    {
      label: 'Precio',
      prop: 'product.price',
      sortable: true,
      colSizes: {
        xs: '1',
      },
    },
    {
      label: 'Acciones',
      prop: 'actions',
      sortable: false,
      alignment: 'right',
      colSizes: {
        xs: 'auto',
      },
    },
  ];
}

