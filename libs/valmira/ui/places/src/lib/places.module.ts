import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsEmptyModule, ApsSearchbarModule } from '@arphase/ui';
import { EntityDataService } from '@ngrx/data';
import { CategorySelectModule } from '@valmira/ui/categories/ui';
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
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxMaskModule } from 'ngx-mask';

import { PlaceFormComponent } from './components/place-form/place-form.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { PlaceFormContainerComponent } from './containers/place-form-container/place-form-container.component';
import { PlaceListContainerComponent } from './containers/place-list-container/place-list-container.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
import { PlaceDataService } from './services/place-data.service';

@NgModule({
  imports: [
    CommonModule,
    PlacesRoutingModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    ApsSearchbarModule,
    ApsEmptyModule,
    NzIconModule,
    NzCardModule,
    NzButtonModule,
    NzToolTipModule,
    NzGridModule,
    NzMessageModule,
    NzDropDownModule,
    NzTypographyModule,
    NzDividerModule,
    NzTableModule,
    NzSpaceModule,
    NzAlertModule,
    NzInputModule,
    NzFormModule,
    NzCollapseModule,
    NzSelectModule,
    NgxMaskModule,
    CategorySelectModule,
  ],
  declarations: [
    PlaceListContainerComponent,
    PlaceListComponent,
    PlacesComponent,
    PlaceFormComponent,
    PlaceFormContainerComponent,
  ],
})
export class PlacesModule {
  constructor(entityDataService: EntityDataService, placeDataService: PlaceDataService) {
    entityDataService.registerService('Place', placeDataService);
  }
}