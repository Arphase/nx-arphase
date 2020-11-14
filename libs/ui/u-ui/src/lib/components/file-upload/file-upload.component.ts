import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileLikeObject, FileUploader } from 'ng2-file-upload';

const fileUploaderInputOptions = ['maxFiles', 'maxFileSize', 'allowedMimeTypes', 'allowedFileTypes'];

export type IvtFileUploadState = 'idle' | 'loading' | 'success' | 'error' | 'preloaded';

@Component({
  selector: 'ivt-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    class: 'ivt-file-upload',
  },
})
export class IvtFileUploadComponent implements OnChanges {
  @ViewChild('input') uploadElRef: ElementRef<HTMLInputElement>;
  @Input() label: string;
  @Input() name: string;
  @Input() minFiles: number;
  @Input() maxFiles: number;
  @Input() maxFileSize: number;
  @Input() showErrors: string;
  @Input() controlName: string;
  @Input() allowedMimeTypes: string[] = [];
  @Input() allowedFileTypes: string[] = [];
  @Input() allowedFileExtensions: string;
  @Input() disabled = false;
  @Input() state: IvtFileUploadState = 'idle';
  @Output() fileQueueChanges = new EventEmitter<FileItem[]>();
  @Output() validChanges = new EventEmitter<boolean>();
  hasBaseDropZoneOver: boolean;
  uploader: FileUploader;
  form: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.uploader = new FileUploader({});

    this.assignUploaderMethods();

    this.form = this.fb.group({
      invalid: [true, Validators.requiredTrue],
      fileSize: [true, Validators.requiredTrue],
      minFiles: [true, Validators.requiredTrue],
      maxFiles: [true, Validators.requiredTrue],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (fileUploaderInputOptions.some(input => !!changes[input])) {
      this.setOptions();
    }

    if (changes.minFiles && changes.minFiles.firstChange) {
      this.form.get('minFiles').patchValue(false);
      this.validChanges.emit(this.form.valid);
    }
  }

  setOptions() {
    const allowedMimeType = this.allowedMimeTypes.length && !this.disabled ? this.allowedMimeTypes : undefined;
    const allowedFileType = this.allowedFileTypes.length ? this.allowedFileTypes : undefined;
    const maxFileSize = this.maxFileSize != null ? this.fileSizeInMB(this.maxFileSize) : undefined;
    const queueLimit = this.maxFiles || undefined;

    this.uploader.setOptions({
      allowedMimeType,
      allowedFileType,
      maxFileSize,
      queueLimit,
    });
  }

  assignUploaderMethods(): void {
    this.uploader.onWhenAddingFileFailed = (item: FileLikeObject, filter: any) => {
      if (!this.disabled) {
        this.uploadElRef.nativeElement.value = '';

        switch (filter.name) {
          case 'fileSize':
            this.form.get('fileSize').patchValue(false);
            this.validChanges.emit(this.form.valid);
            setTimeout(() => {
              this.form.get('fileSize').patchValue(true);
              this.validChanges.emit(this.form.valid);
            }, 5000);
            break;

          case 'queueLimit':
            this.form.get('maxFiles').patchValue(false);
            this.validChanges.emit(this.form.valid);
            setTimeout(() => {
              this.form.get('maxFiles').patchValue(true);
              this.validChanges.emit(this.form.valid);
            }, 5000);
            break;
          case 'mimeType':
          default:
            this.form.get('invalid').patchValue(false);
            this.validChanges.emit(this.form.valid);
            setTimeout(() => {
              this.form.get('invalid').patchValue(true);
              this.validChanges.emit(this.form.valid);
            }, 5000);
            break;
        }
      }
    };

    this.uploader.onAfterAddingFile = () => {
      this.uploadElRef.nativeElement.value = '';
      this.validateFile();
      this.fileQueueChanges.emit(this.uploader.queue);
    };
  }

  fileOverBase(event: boolean): void {
    if (!this.disabled) {
      this.hasBaseDropZoneOver = event;
    }
  }

  validateFile(): void {
    if (this.maxFiles) {
      this.form.get('maxFiles').patchValue(this.uploader.queue.length <= this.maxFiles);
    }

    if (this.minFiles) {
      this.form.get('minFiles').patchValue(this.uploader.queue.length >= this.minFiles);
    }

    this.validChanges.emit(this.form.valid);
  }

  removeItem(item: FileItem): void {
    item.remove();
    this.validateFile();
    this.fileQueueChanges.emit(this.uploader.queue);
    this.setState('idle');
  }

  setState(state: IvtFileUploadState): void {
    this.state = state;
    this.cdr.markForCheck();
  }

  setPreloadedQueue(fileNames: string[]) {
    this.setState('preloaded');

    const files = fileNames.map(name => new File([], name));
    const options = { allowedFileType: undefined, allowedMimeType: undefined };
    const fileItems = files.map(file => new FileItem(this.uploader, file, options));
    this.uploader.queue.push(...fileItems);
    this.fileQueueChanges.emit(this.uploader.queue);
    this.cdr.markForCheck();
  }

  private fileSizeInMB(fileSize: number) {
    return fileSize * 1024 * 1024;
  }
}
