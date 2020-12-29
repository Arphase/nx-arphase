import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { glossary, Product } from '@ivt/c-data';
import { ProductDataService } from '@ivt/u-state';
import { IvtFormComponent } from '@ivt/u-ui';
import { FileItem } from 'ng2-file-upload';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'ivt-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent extends IvtFormComponent<Product> implements OnChanges {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  glossaryOptions = glossary;
  selectedData: { value: string; text: string };

  constructor(private fb: FormBuilder, private productDataService: ProductDataService) {
    super();
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.required],
      price: [null, Validators.required],
      logo: [null, Validators.required],
      template: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
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
    const logo = this.form.get('logo').value;

    this.loadingSubject.next(true);
    this.productDataService
      .getTemplatePreview(text, logo)
      .pipe(
        take(1),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  selectedValue(event: MatSelectChange) {
    let text = this.form.get('template').value;
    this.selectedData = {
      value: event.value,
      text: event.source.triggerValue,
    };
    text += event.value;
    this.form.get('template').patchValue(text);
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
