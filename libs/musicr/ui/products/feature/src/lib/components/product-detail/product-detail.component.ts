import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeepPartial } from '@arphase/common';
import { AdditionalOption, OrderProduct, Photo, Product } from '@musicr/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { filter } from 'rxjs/operators';

export type AdditionalOptionFormValue = AdditionalOption & { selected: boolean };

@UntilDestroy()
@Component({
  selector: 'mrl-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnChanges {
  @ViewChild(NzCarouselComponent) photoCarousel: NzCarouselComponent;
  @Input() product: Product;
  @Input() priceOptions: NzSelectOptionInterface[] = [];
  @Input() additionalOptions: AdditionalOption[] = [];
  @Input() loading: boolean;
  total: number;
  form = new FormGroup({
    priceOptionId: new FormControl<number>(null, Validators.required),
    additionalOptions: new FormArray([]),
  });
  productPrice = 0;
  additionalProductsPrice = 0;
  displayedPhotos: Photo[] = [];
  @Output() addItemToCart = new EventEmitter<DeepPartial<OrderProduct>>();

  get additionalOptionsArray(): FormArray {
    return this.form.get('additionalOptions') as FormArray;
  }

  constructor(private location: Location) {
    this.form
      .get('priceOptionId')
      .valueChanges.pipe(
        filter(() => !!this.product?.priceOptions?.length),
        untilDestroyed(this),
      )
      .subscribe(priceOptionId => {
        const priceOption = this.product.priceOptions.find(priceOption => priceOption.id === priceOptionId);
        this.productPrice = priceOption?.price;
        this.displayedPhotos = priceOption?.photos?.length ? priceOption.photos : this.product.photos;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product && this.product?.id) {
      this.productPrice = this.product.price;
      this.displayedPhotos = this.product.photos;
    }
    if (changes.priceOptions && this.priceOptions?.length) {
      this.form.get('priceOptionId').patchValue(this.priceOptions[0].value);
    }
    if (changes.additionalOptions && this.additionalOptions?.length) {
      this.additionalOptionsArray.clear();
      this.additionalOptions.forEach(additionalOption =>
        this.additionalOptionsArray.push(
          new FormGroup({
            selected: new FormControl<boolean>(false),
            id: new FormControl<number>(additionalOption.id),
            name: new FormControl<string>(additionalOption.name),
            price: new FormControl<number>(additionalOption.price),
          }),
        ),
      );
      this.additionalOptionsArray.valueChanges
        .pipe(untilDestroyed(this))
        .subscribe((additionalOptionsValue: AdditionalOptionFormValue[]) => {
          const priceArray = additionalOptionsValue.filter(({ selected }) => selected).map(({ price }) => price);
          this.additionalProductsPrice = priceArray.length ? priceArray.reduce((a, b) => a + b) : 0;
        });
    }
  }

  onBack(): void {
    this.location.back();
  }

  addItem(): void {
    const item: DeepPartial<OrderProduct> = {
      product: this.product,
      amount: 1,
      productId: this.product.id,
      price: this.productPrice + this.additionalProductsPrice,
      orderProductAdditionalOptions: (this.additionalOptionsArray.value as AdditionalOptionFormValue[])
        .filter(option => option.selected)
        .map(({ id, price }) => ({ additionalOptionId: id, price })),
    };
    this.priceOptions.length
      ? this.addItemToCart.emit({ ...item, priceOptionId: this.form.get('priceOptionId').value })
      : this.addItemToCart.emit(item);
  }

  previous(): void {
    this.photoCarousel.pre();
  }

  next(): void {
    this.photoCarousel.next();
  }
}
