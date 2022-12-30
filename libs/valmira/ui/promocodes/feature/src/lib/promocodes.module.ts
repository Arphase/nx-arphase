import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApsDateFilterModule, ApsEmptyModule, ApsFeatureLayoutModule, ApsSearchbarModule } from '@arphase/ui/core';
import { ApsAutoErrorModule } from '@arphase/ui/forms';
import { PromocodesDataModule } from '@valmira/ui/promocodes/data';
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
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxMaskDirective } from 'ngx-mask';

import { PromocodeFormComponent } from './components/promocode-form/promocode-form.component';
import { PromocodeListComponent } from './components/promocode-list/promocode-list.component';
import { PromocodeFormContainerComponent } from './containers/promocode-form-container/promocode-form-container.component';
import { PromocodeListContainerComponent } from './containers/promocode-list-container/promocode-list-container.component';
import { PromocodesRoutingModule } from './promocodes-routing.module';

@NgModule({
  imports: [
    ApsAutoErrorModule,
    ApsDateFilterModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsSearchbarModule,
    CommonModule,
    FormsModule,
    NgxMaskDirective,
    NzAlertModule,
    NzButtonModule,
    NzCardModule,
    NzDatePickerModule,
    NzDividerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzMessageModule,
    NzModalModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzSwitchModule,
    NzTableModule,
    PromocodesDataModule,
    PromocodesRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PromocodeFormContainerComponent,
    PromocodeListContainerComponent,
    PromocodeListComponent,
    PromocodeFormComponent,
  ],
})
export class PromocodesModule {}
