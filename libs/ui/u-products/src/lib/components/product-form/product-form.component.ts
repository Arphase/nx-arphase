import { HttpClient, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsValidators } from '@arphase/ui';
import { glossary, Product } from '@ivt/c-data';
import { ProductDataService } from '@ivt/u-state';
import { IvtFormComponent } from '@ivt/u-ui';
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

export function createProductForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    price: new FormControl(null, ApsValidators.required),
    logo: new FormControl(null, ApsValidators.required),
    glossary: new FormControl(null),
  });
}

@Component({
  selector: 'ivt-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent extends IvtFormComponent<Product> implements OnInit, OnChanges {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  glossaryOptions = glossary;
  selectedData: { value: string; text: string };
  fileList: NzUploadFile[] = [];
  customRequest = (item: NzUploadXHRArgs): Subscription => {
    return this.http.get('/ivtApi').subscribe((event: HttpResponse<any>) => {
      console.log(item);
      item.onSuccess(event.body, item.file, {}), event;
    });
  };

  constructor(private productDataService: ProductDataService, private http: HttpClient) {
    super();
  }

  ngOnInit() {
    // this.form
    //   .get('glossary')
    //   .valueChanges.pipe(takeUntil(this.destroy$))
    //   .subscribe(value => {});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }

  saveFile(event: NzUploadChangeParam): void {
    const { file } = event;
    if (file.status === 'removed') {
      this.form.get('logo').patchValue('');
      return;
    }

    readFileAsDataUrl(file.originFileObj)
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
