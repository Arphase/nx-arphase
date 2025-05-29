import { CurrencyPipe, Location, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeepPartial } from '@arphase/common';
import { MapperPipe, MapperPipeFunction } from '@arphase/ui/core';
import {
  AdditionalOption,
  getAdditionalOptionCurrentPrice,
  getPriceOptionCurrentPrice,
  OrderProduct,
  Photo,
  Product,
} from '@musicr/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselComponent, NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule, NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { filter } from 'rxjs/operators';

export type AdditionalOptionFormValue = AdditionalOption & { selected: boolean };

@UntilDestroy()
@Component({
  selector: 'mrl-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe,
    FormsModule,
    MapperPipe,
    NgClass,
    NzButtonModule,
    NzCarouselModule,
    NzCheckboxModule,
    NzGridModule,
    NzIconModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzSkeletonModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class ProductDetailComponent implements OnChanges {
  @ViewChild(NzCarouselComponent) photoCarousel: NzCarouselComponent;
  product = input<Product>();
  @Input() priceOptions: NzSelectOptionInterface[] = [];
  @Input() additionalOptions: AdditionalOption[] = [];
  @Input() loading: boolean;
  total: number;
  form = new FormGroup({
    priceOptionId: new FormControl<number>(null, Validators.required),
    additionalOptions: new FormArray([]),
  });
  productPrice = signal<number>(0);
  additionalProductsPrice = signal<number>(0);
  productPriceWithDiscount = signal<number>(0);
  additionalProductsPriceWithDiscount = signal<number>(0);
  totalPrice = computed(() => this.productPrice() + this.additionalProductsPrice());
  totalPriceWithDiscounts = computed(
    () => this.productPriceWithDiscount() + this.additionalProductsPriceWithDiscount(),
  );
  hasPriceDifferences = computed(
    () => this.product().hasActivePromotion && this.totalPrice() !== this.totalPriceWithDiscounts(),
  );
  currentPrice = computed(() => (this.hasPriceDifferences() ? this.totalPriceWithDiscounts() : this.totalPrice()));
  displayedPhotos: Photo[] = [];
  additionalOptionPriceMapper: MapperPipeFunction<AdditionalOption, number> = additionalOption =>
    getAdditionalOptionCurrentPrice(this.product(), additionalOption);

  @Output() addItemToCart = new EventEmitter<DeepPartial<OrderProduct>>();

  get additionalOptionsArray(): FormArray {
    return this.form.get('additionalOptions') as FormArray;
  }

  constructor(private location: Location) {
    this.form
      .get('priceOptionId')
      .valueChanges.pipe(
        filter(() => !!this.product()?.priceOptions?.length),
        untilDestroyed(this),
      )
      .subscribe(priceOptionId => {
        const priceOption = this.product().priceOptions.find(priceOption => priceOption.id === priceOptionId);
        this.productPrice.set(priceOption?.price);
        this.productPriceWithDiscount.set(getPriceOptionCurrentPrice(this.product(), priceOption));
        this.displayedPhotos = priceOption?.photos?.length ? priceOption.photos : this.product().photos;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product && this.product()?.id) {
      this.productPrice.set(this.product().price);
      this.displayedPhotos = this.product().photos;
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
            includedInPromotion: new FormControl<boolean>(additionalOption.includedInPromotion),
          }),
        ),
      );
      this.additionalOptionsArray.valueChanges
        .pipe(untilDestroyed(this))
        .subscribe((additionalOptionsValue: AdditionalOptionFormValue[]) => {
          const getTotalPrice = amountArray => (amountArray.length ? amountArray.reduce((a, b) => a + b) : 0);

          const priceArray = additionalOptionsValue.filter(({ selected }) => selected).map(({ price }) => price);
          this.additionalProductsPrice.set(getTotalPrice(priceArray));

          const priceWithDiscountArray = additionalOptionsValue
            .filter(({ selected }) => selected)
            .map(option => getAdditionalOptionCurrentPrice(this.product(), option));
          this.additionalProductsPriceWithDiscount.set(getTotalPrice(priceWithDiscountArray));
        });
    }
  }

  onBack(): void {
    this.location.back();
  }

  addItem(): void {
    const item: DeepPartial<OrderProduct> = {
      product: this.product(),
      amount: 1,
      productId: this.product().id,
      price: this.currentPrice(),
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
