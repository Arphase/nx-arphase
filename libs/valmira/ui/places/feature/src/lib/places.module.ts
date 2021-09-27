import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApsEmptyModule, ApsFeatureLayoutModule, ApsSearchbarModule } from '@arphase/ui/core';
import { EntityDataService } from '@ngrx/data';
import { PlacesDataModule } from '@valmira/ui/places/data';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxMaskModule } from 'ngx-mask';

import { PlaceFormComponent } from './components/place-form/place-form.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { PlaceFormContainerComponent } from './containers/place-form-container/place-form-container.component';
import { PlaceListContainerComponent } from './containers/place-list-container/place-list-container.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PhotoDataService } from './services/photo-data.service';

@NgModule({
  imports: [
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsSearchbarModule,
    CommonModule,
    FormsModule,
    NgxMaskModule,
    NzAlertModule,
    NzButtonModule,
    NzCardModule,
    NzCollapseModule,
    NzDividerModule,
    NzDropDownModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzMessageModule,
    NzModalModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzSpaceModule,
    NzSwitchModule,
    NzTableModule,
    NzToolTipModule,
    NzTypographyModule,
    NzUploadModule,
    PlacesDataModule,
    PlacesRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PlaceListContainerComponent, PlaceListComponent, PlaceFormComponent, PlaceFormContainerComponent],
})
export class PlacesModule {
  constructor(entityDataService: EntityDataService, photoDataService: PhotoDataService) {
    entityDataService.registerService('Photo', photoDataService);
  }
}
