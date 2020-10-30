import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@ivt/c-data';
import { ProductCollectionService, PermissionService, PermissionTypes } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ivt-product-form-container',
  templateUrl: './product-form-container.component.html',
  styleUrls: ['./product-form-container.component.scss']
})
export class ProductFormContainerComponent extends IvtFormContainerComponent<Product> {
  createSuccessMessage = 'El producto se ha creado con éxito';

  constructor( 
    protected productCollectionService: ProductCollectionService,
    protected router: Router,
    protected toastr: ToastrService,
    private permissionService: PermissionService
  ){
    super(productCollectionService, router, toastr);
  }



}
