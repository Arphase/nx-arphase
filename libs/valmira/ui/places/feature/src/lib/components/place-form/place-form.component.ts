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
import { Place, PlaceCategories } from '@valmira/domain';
import { VALMIRA_CONFIGURATION, ValmiraConfiguration } from '@valmira/ui/core';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { NzUploadFile } from 'ng-zorro-antd/upload';

export function createPlaceForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    description: new FormControl(null, ApsValidators.required),
    capacity: new FormControl(null, ApsValidators.required),
    area: new FormControl(null, ApsValidators.required),
    weeklyPrice: new FormControl(null, ApsValidators.required),
    weekendPrice: new FormControl(null, ApsValidators.required),
    rooms: new FormControl(null, ApsValidators.required),
    beds: new FormControl(null, ApsValidators.required),
    category: new FormControl(null, ApsValidators.required),
    releaseDate: new FormControl(null, ApsValidators.required),
    services: new FormArray([]),
  });
}

@Component({
  selector: 'vma-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceFormComponent extends ApsFormComponent<Place> implements OnChanges {
  allowedMimeType = ['image/jpeg', 'image/jpg'];
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  photosUrl: string;
  categoryOptions: NzSelectOptionInterface[] = [
    {
      label: 'Premium',
      value: PlaceCategories[PlaceCategories.premium],
    },
    {
      label: 'Parejas',
      value: PlaceCategories[PlaceCategories.couple],
    },
    {
      label: 'Niños',
      value: PlaceCategories[PlaceCategories.kids],
    },
  ];
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

  get servicesFormArray(): FormArray {
    return this.form.get('services') as FormArray;
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
    this.servicesFormArray.push(new FormControl('', ApsValidators.required));
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
