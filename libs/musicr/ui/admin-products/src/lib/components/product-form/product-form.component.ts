import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators, filterNil, getBase64, setFormArrayValue } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '@musicr/ui/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { distinctUntilChanged } from 'rxjs';

import { mapPhotoFileArray } from '../../functions/map-file-photo-array';

export function createProductForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    price: new FormControl(null, ApsValidators.required),
    description: new FormControl(null),
    disclaimer: new FormControl(null),
    categoryId: new FormControl(null, ApsValidators.required),
    subcategoryId: new FormControl(null, ApsValidators.required),
    productComponents: new FormArray([]),
    additionalOptions: new FormArray([]),
    priceOptions: new FormArray([]),
  });
}

@UntilDestroy()
@Component({
  selector: 'mrl-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent extends ApsFormComponent<Product> implements OnChanges {
  fileList: NzUploadFile[] = [];
  allowedMimeType = ['image/jpeg', 'image/pjpeg', 'image/jpeg', 'image/pjpeg', 'image/png'];
  previewImage: string | undefined = '';
  previewVisible = false;
  photosUrl: string;
  form = createProductForm();
  @Output() categoryChanges = new EventEmitter<number>();
  @Output() removePhoto = new EventEmitter<number>();

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  onRemovePhoto = async (file: NzUploadFile) => {
    this.removePhoto.emit(Number(file.uid) || file.response.id);
    return true;
  };

  get productComponentsFormArray(): FormArray {
    return this.form?.get('productComponents') as FormArray;
  }

  get additionalOptionsFormArray(): FormArray {
    return this.form?.get('additionalOptions') as FormArray;
  }

  get priceOptionsFormArray(): FormArray {
    return this.form?.get('priceOptions') as FormArray;
  }

  constructor(@Inject(MUSIC_REVOLUTION_CONFIGURATION) private config: MusicRevolutionConfiguration) {
    super();
    this.photosUrl = `${this.config.apiUrl}/photos`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue({ ...this.item, categoryId: this.item.subcategory.categoryId });
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
    this.productComponentsFormArray.push(new FormControl('', ApsValidators.required));
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
