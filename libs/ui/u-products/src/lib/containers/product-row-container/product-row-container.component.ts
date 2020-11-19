import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '@ivt/c-data';
import { ProductCollectionService, ProductDataService } from '@ivt/u-state';
import { IvtRowComponent } from '@ivt/u-ui';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'ivt-product-row-container',
  templateUrl: './product-row-container.component.html',
  styleUrls: ['./product-row-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRowContainerComponent extends IvtRowComponent<Product> {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private productCollectiionService: ProductCollectionService,
    private productDataService: ProductDataService,
  ) {
    super();
  }
}
