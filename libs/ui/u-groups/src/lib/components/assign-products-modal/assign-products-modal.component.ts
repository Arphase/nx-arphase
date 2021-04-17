import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-assign-products-modal',
  templateUrl: './assign-products-modal.component.html',
  styleUrls: ['./assign-products-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignProductsModalComponent extends IvtFormComponent<Product> implements OnInit {
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {}
}
