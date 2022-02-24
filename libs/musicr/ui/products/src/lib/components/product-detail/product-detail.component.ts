import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsValidators } from '@arphase/ui/core';
import { OrderProduct, Photo, Product } from '@musicr/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { filter } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'mrl-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnChanges {
  @Input() product: Product;
  @Input() priceOptions: NzSelectOptionInterface[] = [];
  @Input() loading: boolean;
  total: number;
  form = new FormGroup({ priceOptionId: new FormControl(null, ApsValidators.required) });
  price: number;
  displayedPhotos: Photo[] = [];
  @Output() addItemToCart = new EventEmitter<Partial<OrderProduct>>();

  constructor(private location: Location) {
    this.form
      .get('priceOptionId')
      .valueChanges.pipe(
        filter(() => !!this.product?.priceOptions?.length),
        untilDestroyed(this)
      )
      .subscribe(priceOptionId => {
        const priceOption = this.product.priceOptions.find(priceOption => priceOption.id === priceOptionId);
        this.price = priceOption?.price;
        this.displayedPhotos = priceOption?.photos?.length ? priceOption.photos : this.product.photos;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product && this.product?.id) {
      this.price = this.product.price;
      this.displayedPhotos = this.product.photos;
    }
    if (changes.priceOptions && this.priceOptions?.length) {
      this.form.get('priceOptionId').patchValue(this.priceOptions[0].value);
    }
  }

  onBack(): void {
    this.location.back();
  }

  addItem(): void {
    const item: Partial<OrderProduct> = {
      product: this.product,
      amount: 1,
      productId: this.product.id,
      price: this.price,
    };
    this.priceOptions.length
      ? this.addItemToCart.emit({ ...item, priceOptionId: this.form.get('priceOptionId').value })
      : this.addItemToCart.emit(item);
  }
}
