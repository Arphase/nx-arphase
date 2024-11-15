import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApsEmptyModule, ApsFeatureLayoutModule, ApsSearchbarModule } from '@arphase/ui/core';
import { ApsAutoErrorModule } from '@arphase/ui/forms';
import { AdditionalProductsDataModule } from '@valmira/ui/additional-products/data';
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
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxMaskDirective } from 'ngx-mask';

import { AdditionalProductsRoutingModule } from './additional-products-routing.module';
import { AdditionalProductFormComponent } from './components/additional-product-form/additional-product-form.component';
import { AdditionalProductListComponent } from './components/additional-product-list/additional-product-list.component';
import { AdditionalProductFormContainerComponent } from './containers/additional-product-form-container/additional-product-form-container.component';
import { AdditionalProductListContainerComponent } from './containers/additional-product-list-container/additional-product-list-container.component';

@NgModule({
  imports: [
    AdditionalProductsDataModule,
    AdditionalProductsRoutingModule,
    ApsAutoErrorModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsSearchbarModule,
    CommonModule,
    FormsModule,
    NgxMaskDirective,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzSwitchModule,
    NzMessageModule,
    NzModalModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzTableModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdditionalProductFormContainerComponent,
    AdditionalProductListContainerComponent,
    AdditionalProductListComponent,
    AdditionalProductFormComponent,
  ],
})
export class AdditionalProductsModule {}
