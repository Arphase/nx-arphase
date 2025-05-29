import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  ApsAutoErrorModule,
  ApsFormComponent,
  ApsValidators,
  ControlsOf,
  enableControl,
  setFormArrayValue,
} from '@arphase/ui/forms';
import { filterNil, getBase64 } from '@arphase/ui/utils';
import { Product } from '@musicr/domain';
import { MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '@musicr/ui/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { distinctUntilChanged } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategorySelectModule } from '@musicr/ui/categories/ui';
import { SubcategorySelectModule } from '@musicr/ui/subcategories/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NgxMaskDirective } from 'ngx-mask';
import { AdditionalOptionsFormContainerComponent } from '../../containers/additional-options-form-container/additional-options-form-container.component';
import { PriceOptionsFormContainerComponent } from '../../containers/price-options-form-container/price-options-form-container.component';
import { mapPhotoFileArray } from '../../functions/map-file-photo-array';

export function createProductForm(): FormGroup<ControlsOf<Partial<Product & { categoryId: number }>>> {
  return new UntypedFormGroup({
    id: new FormControl<number>(null),
    name: new FormControl<string>(null, ApsValidators.required),
    price: new FormControl<number>(null, ApsValidators.required),
    description: new FormControl<string>(null),
    disclaimer: new FormControl<string>(null),
    categoryId: new FormControl<number>(null, ApsValidators.required),
    subcategoryId: new FormControl<number>(null, ApsValidators.required),
    popularity: new FormControl<number>(0),
    hasActivePromotion: new FormControl<boolean>(false),
    promotionDiscount: new FormControl<number>(0, [ApsValidators.min(0), ApsValidators.max(100)]),
    productComponents: new UntypedFormArray([]),
    additionalOptions: new UntypedFormArray([]),
    priceOptions: new UntypedFormArray([]),
  });
}

@UntilDestroy()
@Component({
  selector: 'mrl-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AdditionalOptionsFormContainerComponent,
    ApsAutoErrorModule,
    CategorySelectModule,
    CommonModule,
    NgxMaskDirective,
    NzButtonModule,
    NzCheckboxModule,
    NzCollapseModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzModalModule,
    NzPageHeaderModule,
    NzSelectComponent,
    NzSpaceModule,
    NzSwitchModule,
    NzUploadModule,
    PriceOptionsFormContainerComponent,
    ReactiveFormsModule,
    RouterModule,
    SubcategorySelectModule,
  ],
})
export class ProductFormComponent extends ApsFormComponent<Product> implements OnChanges {
  fileList: NzUploadFile[] = [];
  allowedMimeType = ['image/jpeg', 'image/jpg'];
  previewImage: string;
  previewVisible: boolean;
  photosUrl = `${this.config.apiUrl}/photos`;
  form = createProductForm();
  @Output() categoryChanges = new EventEmitter<number>();
  @Output() removePhoto = new EventEmitter<number>();

  get productComponentsFormArray(): UntypedFormArray {
    return this.form?.get('productComponents') as UntypedFormArray;
  }

  get additionalOptionsFormArray(): UntypedFormArray {
    return this.form?.get('additionalOptions') as UntypedFormArray;
  }

  get priceOptionsFormArray(): UntypedFormArray {
    return this.form?.get('priceOptions') as UntypedFormArray;
  }

  get showPromotionField(): boolean {
    return this.values.hasActivePromotion;
  }

  constructor(@Inject(MUSIC_REVOLUTION_CONFIGURATION) private config: MusicRevolutionConfiguration) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.patchForm();
    }

    if (changes.form && this.form) {
      this.initValueChanges();
    }
  }

  patchForm(): void {
    this.form.patchValue({
      ...this.item,
      categoryId: this.item.subcategory.categoryId,
      subcategoryId: this.item.subcategory.id,
      popularity: this.item.popularity ?? 0,
      promotionDiscount: this.item.promotionDiscount ?? 0,
    });
    this.fileList = this.item.photos.map(photo => ({
      uid: String(photo.id),
      name: photo.key,
      url: photo.url,
      status: 'done',
    }));
    setFormArrayValue(this.productComponentsFormArray, this.item.productComponents);
    this.priceOptionsFormArray.controls.forEach(control =>
      enableControl(control.get('includedInPromotion'), this.item.hasActivePromotion),
    );
    this.additionalOptionsFormArray.controls.forEach(control =>
      enableControl(control.get('includedInPromotion'), this.item.hasActivePromotion),
    );
  }

  initValueChanges(): void {
    this.form
      .get('categoryId')
      .valueChanges.pipe(untilDestroyed(this), filterNil(), distinctUntilChanged())
      .subscribe(value => {
        this.categoryChanges.emit(Number(value));
        this.form.get('subcategoryId').patchValue(null, { emitEvent: false });
      });

    this.form
      .get('hasActivePromotion')
      .valueChanges.pipe(untilDestroyed(this), filterNil(), distinctUntilChanged())
      .subscribe(value => {
        const handleControlChange = control => {
          enableControl(control.get('includedInPromotion'), value);
          control.patchValue({ includedInPromotion: value });
        };
        this.priceOptionsFormArray.controls.forEach(handleControlChange);
        this.additionalOptionsFormArray.controls.forEach(handleControlChange);
      });
  }

  addComponent(): void {
    this.productComponentsFormArray.push(new UntypedFormControl('', ApsValidators.required));
  }

  removeComponent(index: number): void {
    this.productComponentsFormArray.removeAt(index);
  }

  transformFromForm(values: Product): Product {
    return {
      ...values,
      photos: mapPhotoFileArray(this.fileList),
    };
  }

  async handlePreview(file: NzUploadFile): Promise<void> {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }

  async onRemovePhoto(file: NzUploadFile): Promise<boolean> {
    this.removePhoto.emit(Number(file.uid) || file.response.id);
    return true;
  }
}
