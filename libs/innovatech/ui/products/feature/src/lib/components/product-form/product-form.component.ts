import { HttpClient, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsValidators } from '@arphase/ui';
import { glossary, Product } from '@innovatech/common/domain';
import { filterNil, sortSelectOptions } from '@innovatech/common/utils';
import { ProductDataService } from '@innovatech/ui/products/data';
import { IvtFormComponent } from '@ivt/u-ui';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';

import { ProductForm } from '../../models/product-form.model';

export function createProductForm(): FormGroup {
  return new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, ApsValidators.required),
    price: new FormControl(null, ApsValidators.required),
    logo: new FormControl(null, ApsValidators.required),
    yearValidations: new FormGroup(
      {
        minYear: new FormControl(null, ApsValidators.required),
        maxYear: new FormControl(null, ApsValidators.required),
      },
      { validators: ApsValidators.minMax('minYear', 'maxYear') }
    ),
    hpValidations: new FormGroup(
      {
        minHp: new FormControl(null, ApsValidators.required),
        maxHp: new FormControl(null, ApsValidators.required),
      },
      { validators: ApsValidators.minMax('minHp', 'maxHp') }
    ),
    template: new FormControl('', ApsValidators.required),
    glossary: new FormControl(null),
  });
}

@Component({
  selector: 'ivt-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProductFormComponent extends IvtFormComponent<Product, ProductForm> implements OnInit, OnChanges {
  form = createProductForm();
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  glossaryOptions = sortSelectOptions(glossary);
  selectedData: { value: string; text: string };
  fileList: NzUploadFile[] = [];
  imageFileTypes = 'image/png,image/jpeg,image/jpg';
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    showDownloadIcon: false,
  };
  customRequest = (item: NzUploadXHRArgs): Subscription => {
    return this.http.get('/ivtApi').subscribe((event: HttpResponse<any>) => {
      item.onSuccess(event.body, item.file, {}), event;
    });
  };
  preview = (file: NzUploadFile): void => {
    this.modalService.create({
      nzBodyStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
      nzContent: `<img width="400" height="400" src="${file.thumbUrl}">`,
      nzFooter: null,
    });
  };

  get yearValidationsForm(): FormGroup {
    return this.form.get('yearValidations') as FormGroup;
  }

  get hpValidationsForm(): FormGroup {
    return this.form.get('hpValidations') as FormGroup;
  }

  get yearValidationsFormError(): boolean {
    return (
      this.yearValidationsForm.invalid &&
      this.yearValidationsForm.get('minYear').touched &&
      this.yearValidationsForm.get('maxYear').touched
    );
  }

  get hpValidationsFormError(): boolean {
    return (
      this.hpValidationsForm.invalid &&
      this.hpValidationsForm.get('minHp').touched &&
      this.hpValidationsForm.get('maxHp').touched
    );
  }

  constructor(
    private productDataService: ProductDataService,
    private http: HttpClient,
    private modalService: NzModalService
  ) {
    super();
  }

  ngOnInit() {
    const glossaryControl = this.form.get('glossary');
    glossaryControl.valueChanges.pipe(filterNil(), takeUntil(this.destroy$)).subscribe(value => {
      const control = this.form.get('template');
      control.patchValue(`${control.value} ${value}`);
      glossaryControl.patchValue('', { emitEvent: false });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue({
        ...this.item,
        yearValidations: { minYear: this.item.minYear, maxYear: this.item.maxYear },
        hpValidations: { minHp: this.item.minHp, maxHp: this.item.maxHp },
      });
      this.fileList = [
        {
          uid: '1',
          name: 'logo',
          originFileObj: dataURLtoFile(this.item.logo, 'logo'),
        },
      ];
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

  transformFromForm(form: ProductForm): Product {
    return {
      ...form,
      minYear: form.yearValidations.minYear,
      maxYear: form.yearValidations.maxYear,
      minHp: form.hpValidations.minHp,
      maxHp: form.hpValidations.maxHp,
    };
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

export function dataURLtoFile(dataurl: string, filename: string): File {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}