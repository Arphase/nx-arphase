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
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ApsFormComponent, ApsValidators, ControlsOf, setFormArrayValue } from '@arphase/ui/forms';
import { getBase64 } from '@arphase/ui/utils';
import { Photo, PriceOption } from '@musicr/domain';
import { MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '@musicr/ui/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { mapPhotoFileArray } from '../../functions/map-file-photo-array';

export function createPhotoFormGroup(item?: Photo): FormGroup<ControlsOf<Photo>> {
  const form = new FormGroup({
    id: new FormControl<number>(null),
    key: new FormControl<string>(null),
    url: new FormControl<string>(null),
  });
  if (item) {
    form.patchValue(item);
  }
  return form;
}

export function createPriceOptionForm(item?: PriceOption): FormGroup<ControlsOf<Partial<PriceOption>>> {
  const form = new UntypedFormGroup({
    id: new FormControl<number>(null),
    name: new FormControl<string>(null, ApsValidators.required),
    price: new FormControl<number>(null, ApsValidators.required),
    photos: new FormArray([]),
  });
  if (item) {
    form.patchValue(item);
    setFormArrayValue(form.get('photos') as UntypedFormArray, item.photos, item => createPhotoFormGroup(item));
  }
  return form;
}

@Component({
  selector: 'mrl-price-option-form',
  templateUrl: './price-option-form.component.html',
  styleUrls: ['./price-option-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceOptionFormComponent extends ApsFormComponent<Partial<PriceOption>> implements OnChanges {
  form = createPriceOptionForm();
  allowedMimeType = ['image/jpeg', 'image/jpg'];
  fileList: NzUploadFile[] = [];
  previewImage = '';
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

  get photosFormArray(): UntypedFormArray {
    return this.form?.get('photos') as UntypedFormArray;
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
