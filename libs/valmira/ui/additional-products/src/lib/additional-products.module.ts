import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule, ApsEmptyModule, ApsFeatureLayoutModule, ApsSearchbarModule } from '@arphase/ui/core';
import { EntityDataService } from '@ngrx/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxMaskModule } from 'ngx-mask';

import { AdditionalProductsRoutingModule } from './additional-products-routing.module';
import { AdditionalProductFormComponent } from './components/additional-product-form/additional-product-form.component';
import { AdditionalProductListComponent } from './components/additional-product-list/additional-product-list.component';
import { AdditionalProductFormContainerComponent } from './containers/additional-product-form-container/additional-product-form-container.component';
import { AdditionalProductListContainerComponent } from './containers/additional-product-list-container/additional-product-list-container.component';
import { AdditionalProductDataService } from './services/additional-product-data.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdditionalProductsRoutingModule,
    NzGridModule,
    NzCardModule,
    NzDividerModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzSpaceModule,
    NzPageHeaderModule,
    NzModalModule,
    NzMessageModule,
    ApsSearchbarModule,
    ApsAutoErrorModule,
    ApsFeatureLayoutModule,
    ApsEmptyModule,
    NgxMaskModule,
  ],
  declarations: [
    AdditionalProductFormContainerComponent,
    AdditionalProductListContainerComponent,
    AdditionalProductListComponent,
    AdditionalProductFormComponent,
  ],
})
export class AdditionalProductsModule {
  constructor(entityDataService: EntityDataService, additionalProductDataService: AdditionalProductDataService) {
    entityDataService.registerService('AdditionalProduct', additionalProductDataService);
  }
}
