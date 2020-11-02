import { ChangeDetectionStrategy, Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'ivt-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductFormComponent extends IvtFormComponent<Product> {
  selectedFile: File = null;
  constructor(private fb: FormBuilder, private http: HttpClient) { 
    super();
    this.form = this.fb.group({
      id: null,
      name: [null,Validators.required],
      price: [null, Validators.required],
      logo: [null, Validators.required],
      template: [null, Validators.required]
    })
  }

  onFileSelected() {
    this.form.get("logo").valueChanges.subscribe(selectedValue  => {
      this.selectedFile = selectedValue
    })
  }

  readFileAsDataUrl(file: File): Observable<string> {
    const subject = new Subject<string>();
    const reader = new FileReader();
  
    reader.onload = () => subject.next(reader.result as string);
    reader.onerror = error => subject.error(error);
    reader.onloadend = () => subject.complete();
    reader.readAsDataURL(file);
  
    return subject.asObservable();
  }

  onUpload() {
    const fd = new FormData();
    this.readFileAsDataUrl(this.selectedFile)
    fd.append('image', this.selectedFile, this.selectedFile.name)

    //endpoint
    this.http.post('url', fd)
      .subscribe(res => {
        console.log(res);
      });
  }
}