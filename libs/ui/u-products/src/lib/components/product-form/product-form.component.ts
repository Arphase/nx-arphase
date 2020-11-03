import { ChangeDetectionStrategy, Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'ivt-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductFormComponent extends IvtFormComponent<Product> {
  
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
}