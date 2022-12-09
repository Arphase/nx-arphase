import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators, getBase64 } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '@musicr/ui/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

export function createCategoryForm(): UntypedFormGroup {
  return new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, ApsValidators.required),
    description: new UntypedFormControl(null, ApsValidators.required),
  });
}

@Component({
  selector: 'mrl-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent extends ApsFormComponent<Category> implements OnChanges {
  fileList: NzUploadFile[] = [];
  allowedMimeType = ['image/jpeg', 'image/jpg'];
  previewImage: string;
  photosUrl = `${this.config.apiUrl}/photos`;
  previewVisible: boolean;
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

  constructor(
    @Inject(MUSIC_REVOLUTION_CONFIGURATION) private config: MusicRevolutionConfiguration,
    private messageService: NzMessageService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
      if (this.item.photo) {
        const { id, key, url } = this.item.photo;
        this.fileList = [
          {
            uid: String(id),
            name: key,
            url,
            status: 'done',
          },
        ];
      }
    }
  }

  transformFromForm(values: Category): Category {
    const file = this.fileList[0];
    const photo = file.response
      ? file.response
      : {
          id: file.uid,
          key: file.name,
          url: file.url,
        };
    return {
      ...values,
      photo,
    };
  }

  submit(): void {
    this.fileList[0]
      ? super.submit()
      : this.messageService.error('Es necesario subir una foto para guardar la categoría');
  }
}
