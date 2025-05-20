import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators, ControlsOf, setFormArrayValue } from '@arphase/ui/forms';
import { filterNil, getBase64 } from '@arphase/ui/utils';
import { Product } from '@musicr/domain';
import { MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '@musicr/ui/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { distinctUntilChanged } from 'rxjs/operators';

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
  standalone: false,
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

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  onRemovePhoto = async (file: NzUploadFile): Promise<boolean> => {
    this.removePhoto.emit(Number(file.uid) || file.response.id);
    return true;
  };

  get productComponentsFormArray(): UntypedFormArray {
    return this.form?.get('productComponents') as UntypedFormArray;
  }

  get additionalOptionsFormArray(): UntypedFormArray {
    return this.form?.get('additionalOptions') as UntypedFormArray;
  }

  get priceOptionsFormArray(): UntypedFormArray {
    return this.form?.get('priceOptions') as UntypedFormArray;
  }

  constructor(@Inject(MUSIC_REVOLUTION_CONFIGURATION) private config: MusicRevolutionConfiguration) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue({
        ...this.item,
        categoryId: this.item.subcategory.categoryId,
        subcategoryId: this.item.subcategory.id,
        popularity: this.item.popularity ?? 0,
      });
      this.fileList = this.item.photos.map(photo => ({
        uid: String(photo.id),
        name: photo.key,
        url: photo.url,
        status: 'done',
      }));
      setFormArrayValue(this.productComponentsFormArray, this.item.productComponents);
    }

    if (changes.form && this.form) {
      this.form
        .get('categoryId')
        .valueChanges.pipe(untilDestroyed(this), filterNil(), distinctUntilChanged())
        .subscribe(value => {
          this.categoryChanges.emit(Number(value));
          this.form.get('subcategoryId').patchValue(null, { emitEvent: false });
        });
    }
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
}
