import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule } from '@arphase/ui/core';
import { PlacesDataModule } from '@valmira/ui/places/data';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { PlaceSearchFormComponent } from './components/place-search-form/place-search-form.component';
import { PlaceSearchComponent } from './components/place-search/place-search.component';
import { PlaceSearchContainerComponent } from './containers/place-search-container/place-search-container.component';
import { PlaceSearchRoutingModule } from './place-search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ApsAutoErrorModule,
    NzAlertModule,
    NzButtonModule,
    NzDatePickerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    PlacesDataModule,
    PlaceSearchRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PlaceSearchContainerComponent, PlaceSearchComponent, PlaceSearchFormComponent],
})
export class PlaceSearchModule {}