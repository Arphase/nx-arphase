import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule } from '@arphase/ui/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AdditionalProductsDataModule } from '@valmira/ui/additional-products/data';
import { ReservationsDataModule } from '@valmira/ui/reservations/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NgxMaskModule } from 'ngx-mask';
import { NgxStripeModule } from 'ngx-stripe';

import { AdditionalServicesComponent } from './components/additional-services/additional-services.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { ReservationWizardComponent } from './components/reservation-wizard/reservation-wizard.component';
import { AdditionalServicesContainerComponent } from './containers/additional-services-container/additional-services-container.component';
import { ConfirmationContainerComponent } from './containers/confirmation-container/confirmation-container.component';
import { PaymentMethodContainerComponent } from './containers/payment-method-container/payment-method-container.component';
import { PersonalDataContainerComponent } from './containers/personal-data-container/personal-data-container.component';
import { ReservationWizardContainerComponent } from './containers/reservation-wizard-container/reservation-wizard-container.component';
import { ReservationWizardRoutingModule } from './reservation-wizard-routing.module';
import { ReservationWizardEffects } from './state/reservation-wizard.effects';
import { reducer } from './state/reservation-wizard.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('reservationWizard', reducer),
    EffectsModule.forFeature([ReservationWizardEffects]),
    ApsAutoErrorModule,
    AdditionalProductsDataModule,
    CommonModule,
    NzButtonModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule,
    ReservationsDataModule,
    ReservationWizardRoutingModule,
    NzSpaceModule,
    NzCheckboxModule,
    NgxMaskModule,
    NgxStripeModule,
    NzIconModule,
  ],
  declarations: [
    AdditionalServicesComponent,
    AdditionalServicesContainerComponent,
    ConfirmationComponent,
    ConfirmationContainerComponent,
    PaymentMethodComponent,
    PaymentMethodContainerComponent,
    PersonalDataComponent,
    PersonalDataContainerComponent,
    ReservationWizardComponent,
    ReservationWizardContainerComponent,
  ],
})
export class ReservationWizardModule {}
