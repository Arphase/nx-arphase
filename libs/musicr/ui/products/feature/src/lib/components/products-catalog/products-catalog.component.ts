import { CurrencyPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventType, RouterLink } from '@angular/router';
import { ApsQueryParams } from '@arphase/common';
import {
  ApsCheckboxFilterModule,
  ApsRangeFilterComponent,
  MapperPipe,
  MapperPipeFunction,
  Range,
} from '@arphase/ui/core';
import { sortSelectOptions } from '@arphase/ui/utils';
import { eventTypeOptions, getProductCurrentPrice, Product } from '@musicr/domain';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule, NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { sortOptions } from './product-catalog.constants';

@Component({
  selector: 'mrl-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.less'],
  imports: [
    ApsCheckboxFilterModule,
    ApsRangeFilterComponent,
    CurrencyPipe,
    FormsModule,
    MapperPipe,
    NgClass,
    NzButtonModule,
    NzGridModule,
    NzSelectModule,
    NzSkeletonModule,
    NzToolTipModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCatalogComponent implements OnChanges {
  products = input<Product[]>();
  title = input<string>();
  loading = input<boolean>();
  loadingSort = input<boolean>();
  sort = output<NzSelectOptionInterface>();
  filter = output<ApsQueryParams>();
  mockArray = new Array(8).fill(null).map((_, index) => ({
    id: index,
  }));
  priceMapper: MapperPipeFunction<Product, number> = (product: Product) => getProductCurrentPrice(product);
  sortOptions = sortOptions;
  eventTypeOptions = sortSelectOptions(eventTypeOptions);
  filterDrawerVisible = false;
  sortingOption = this.sortOptions[3].value;
  buttonStyles = {
    height: '32px',
    padding: '0 12px',
    marginRight: '8px',
    backgroundColor: 'white',
  };
  dropdownStyles = {
    width: '250px',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.title && this.title) {
      this.sortingOption = this.sortOptions[3].value;
    }
  }

  filterEventType(selectedEventTypes: EventType[]): void {
    this.filter.emit({ eventTypes: selectedEventTypes });
  }

  filterPrice(ranges: Range): void {
    const { min, max } = ranges;
    this.filter.emit({ minPrice: min, maxPrice: max });
  }
}
