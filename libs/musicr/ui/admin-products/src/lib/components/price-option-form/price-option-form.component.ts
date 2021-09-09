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
import { ApsFormComponent, ApsValidators, getBase64, setFormArrayValue } from '@arphase/ui/core';
import { Photo, PriceOption } from '@musicr/domain';
import { MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '@musicr/ui/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { mapPhotoFileArray } from '../../functions/map-file-photo-array';

export function createPhotoFormGroup(item?: Photo): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    key: new FormControl(null),
    url: new FormControl(null),
  });
  if (item) {
    form.patchValue(item);
  }
  return form;
}

export function createPriceOptionForm(item?: PriceOption): FormGroup {
  const form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    price: new FormControl(null, ApsValidators.required),
    photos: new FormArray([]),
  });
  if (item) {
    form.patchValue(item);
    setFormArrayValue(form.get('photos') as FormArray, item.photos, item => createPhotoFormGroup(item));
  }
  return form;
}

@Component({
  selector: 'mrl-price-option-form',
  templateUrl: './price-option-form.component.html',
  styleUrls: ['./price-option-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceOptionFormComponent extends ApsFormComponent<PriceOption> implements OnChanges {
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  photosUrl: string;
  @Output() deleteItem = new EventEmitter<void>();
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

  get photosFormArray(): FormArray {
    return this.form?.get('photos') as FormArray;
  }

  constructor(@Inject(MUSIC_REVOLUTION_CONFIGURATION) private config: MusicRevolutionConfiguration) {
    super();
    this.photosUrl = `${this.config.apiUrl}/photos`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.form && this.form) {
      this.fileList = this.values.photos.map(photo => ({
        uid: String(photo.id),
        name: photo.key,
        url: photo.url,
        status: 'done',
      }));
    }
  }

  onFilesChange(): void {
    setFormArrayValue(this.photosFormArray, mapPhotoFileArray(this.fileList), item => createPhotoFormGroup(item));
  }
}
