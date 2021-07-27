import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsEmptyModule, ApsSearchbarModule } from '@arphase/ui';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { PlaceListComponent } from './components/place-list/place-list.component';
import { PlaceListContainerComponent } from './containers/place-list-container/place-list-container.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';

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
  ],
  declarations: [PlaceListContainerComponent, PlaceListComponent, PlacesComponent],
})
export class PlacesModule {}
