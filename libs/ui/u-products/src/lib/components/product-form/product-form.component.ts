import { ChangeDetectionStrategy, Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FileItem } from 'ng2-file-upload';
import { finalize, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ProductDataService } from '@ivt/u-state';

@Component({
  selector: 'ivt-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductFormComponent extends IvtFormComponent<Product> {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private fb: FormBuilder, private http: HttpClient, private productDataService: ProductDataService) { 
    super();
    this.form = this.fb.group({
      id: null,
      name: [null,Validators.required],
      price: [null, Validators.required],
      logo: [null, Validators.required],
      template: [null, Validators.required]
    })
  }

  saveFile(files: FileItem[]): void {
    if (files.length === 0) {
      this.form.get('logo').patchValue('');
      return;
    }

    readFileAsDataUrl(files[0]._file)
      .pipe(take(1))
      .subscribe(convertedFile => this.form.get('logo').patchValue(convertedFile));
  }

  downloadTemplatePreview(): void {
    const text = this.form.get('template').value;
    console.log("text: " + text)
    this.loadingSubject.next(true);
    this.productDataService
      .getTemplatePreview(text)
      .pipe(
        take(1),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
}

export function readFileAsDataUrl(file: File): Observable<string> {
  const subject = new Subject<string>();
  const reader = new FileReader();
  reader.onload = () => subject.next(reader.result as string);
  reader.onerror = error => subject.error(error);
  reader.onloadend = () => subject.complete();
  reader.readAsDataURL(file);
  return subject.asObservable();
}