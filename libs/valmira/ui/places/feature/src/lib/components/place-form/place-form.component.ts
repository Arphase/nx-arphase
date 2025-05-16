import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators, setFormArrayValue } from '@arphase/ui/forms';
import { getBase64 } from '@arphase/ui/utils';
import { Place } from '@valmira/domain';
import { VALMIRA_CONFIGURATION, ValmiraConfiguration } from '@valmira/ui/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

export function createPlaceForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, ApsValidators.required),
    description: new UntypedFormControl(null, ApsValidators.required),
    capacity: new UntypedFormControl(null, ApsValidators.required),
    area: new UntypedFormControl(null, ApsValidators.required),
    weeklyPrice: new UntypedFormControl(null, ApsValidators.required),
    weekendPrice: new UntypedFormControl(null, ApsValidators.required),
    rooms: new UntypedFormControl(null, ApsValidators.required),
    beds: new UntypedFormControl(null, ApsValidators.required),
    releaseDate: new UntypedFormControl(null, ApsValidators.required),
    services: new UntypedFormArray([]),
  });
}

@Component({
  selector: 'vma-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PlaceFormComponent extends ApsFormComponent<Place> implements OnChanges {
  form = createPlaceForm();
  allowedMimeType = ['image/jpeg', 'image/jpg'];
  fileList: NzUploadFile[] = [];
  previewImage = '';
  previewVisible = false;
  photosUrl: string;
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

  get servicesFormArray(): UntypedFormArray {
    return this.form.get('services') as UntypedFormArray;
  }

  constructor(@Inject(VALMIRA_CONFIGURATION) private config: ValmiraConfiguration) {
    super();
    this.photosUrl = `${this.config.apiUrl}/photos`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
      this.fileList = this.item.photos.map(photo => ({
        uid: String(photo.id),
        name: photo.key,
        url: photo.path,
        status: 'done',
      }));
      setFormArrayValue(this.servicesFormArray, this.item.services);
    }
  }

  addService(): void {
    this.servicesFormArray.push(new UntypedFormControl('', ApsValidators.required));
  }

  removeService(index: number): void {
    this.servicesFormArray.removeAt(index);
  }

  transformFromForm(values: Place): Place {
    return {
      ...values,
      photos: this.fileList.map(file => {
        const mappedFile = file.response
          ? {
              id: file.response.id,
              key: file.response.key,
              path: file.response.path,
            }
          : {
              id: file.uid,
              key: file.name,
              path: file.url,
            };
        return mappedFile;
      }),
    };
  }
}
