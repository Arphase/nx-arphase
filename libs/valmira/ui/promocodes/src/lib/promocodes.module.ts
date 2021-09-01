import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule, ApsDateFilterModule, ApsEmptyModule, ApsSearchbarModule } from '@arphase/ui/core';
import { EntityDataService } from '@ngrx/data';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
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

import { PromocodeFormComponent } from './components/promocode-form/promocode-form.component';
import { PromocodeListComponent } from './components/promocode-list/promocode-list.component';
import { PromocodeFormContainerComponent } from './containers/promocode-form-container/promocode-form-container.component';
import { PromocodeListContainerComponent } from './containers/promocode-list-container/promocode-list-container.component';
import { PromocodesRoutingModule } from './promocodes-routing.module';
import { PromocodesComponent } from './promocodes.component';
import { PromocodeDataService } from './services/promocode-data.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PromocodesRoutingModule,
    NzGridModule,
    NzCardModule,
    NzDividerModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzIconModule,
    NzMessageModule,
    NzAlertModule,
    NzModalModule,
    ApsSearchbarModule,
    ApsAutoErrorModule,
    ApsEmptyModule,
    ApsDateFilterModule,
    NgxMaskModule,
  ],
  declarations: [
    PromocodeFormContainerComponent,
    PromocodeListContainerComponent,
    PromocodeListComponent,
    PromocodeFormComponent,
    PromocodesComponent,
  ],
})
export class PromocodesModule {
  constructor(entityDataService: EntityDataService, promocodeDataService: PromocodeDataService) {
    entityDataService.registerService('Promocode', promocodeDataService);
  }
}
