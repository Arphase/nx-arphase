import { Directive, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FileItem } from 'ng2-file-upload';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { IvtFileUploadComponent, IvtFileUploadState } from './file-upload.component';
import { FileUploadPayload, IvtFileUploadService } from './file-upload.service';

export function readFileAsDataUrl(file: File): Observable<string> {
  const subject = new Subject<string>();
  const reader = new FileReader();

  reader.onload = () => subject.next(reader.result as string);
  reader.onerror = error => subject.error(error);
  reader.onloadend = () => subject.complete();
  reader.readAsDataURL(file);

  return subject.asObservable();
}

export interface FileUploadStateChanges extends FileUploadPayload {
  state: IvtFileUploadState;
}

@Directive({
  selector: '[ivtEagerFileUpload]',
})
export class EagerFileUploadDirective implements OnChanges {
  @Input('ivtEagerFileUpload') params: Omit<FileUploadPayload, 'file'>;
  @Input() preloadFileName: string;
  @Output() uploadStateChanges = new EventEmitter<FileUploadStateChanges>();
  @Output() preloadedFile = new EventEmitter<{ field: string }>();
  file: string;

  constructor(private fileUploadService: IvtFileUploadService, private host: IvtFileUploadComponent) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.preloadFileName && this.preloadFileName) {
      this.host.setPreloadedQueue([this.preloadFileName]);
      this.preloadedFile.emit({ field: this.params?.field });
    }
  }

  @HostListener('fileQueueChanges', ['$event'])
  onFileQueueChanges(queue: FileItem[]) {
    const [fileItem] = queue;

    if (!fileItem) {
      this.file = null;
      this.host.setState('idle');
      this.emitUploadStateChanges();
      return;
    }

    if (this.host.state === 'preloaded') {
      this.file = null;
      this.emitUploadStateChanges();
      return;
    }

    this.host.setState('loading');
    this.emitUploadStateChanges();

    readFileAsDataUrl(fileItem._file)
      .pipe(
        tap(file => (this.file = file)),
        switchMap(file => this.fileUploadService.upload({ ...this.params, file }))
      )
      .subscribe({
        next: response => {
          this.host.setState('success');
        },
        error: error => {
          this.host.setState('error');
          this.file = null;
        },
        complete: () => {
          this.emitUploadStateChanges();
        },
      });
  }

  private emitUploadStateChanges() {
    this.uploadStateChanges.emit({ ...this.params, file: this.file, state: this.host.state });
  }
}
