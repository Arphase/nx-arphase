import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationResolverService } from '@valmira/ui/reservations/data';

import { AdditionalServicesContainerComponent } from './containers/additional-services-container/additional-services-container.component';
import { ConfirmationContainerComponent } from './containers/confirmation-container/confirmation-container.component';
import { PaymentMethodContainerComponent } from './containers/payment-method-container/payment-method-container.component';
import { PersonalDataContainerComponent } from './containers/personal-data-container/personal-data-container.component';
import { ReservationWizardContainerComponent } from './containers/reservation-wizard-container/reservation-wizard-container.component';

export const routes: Routes = [
  {
    path: ':id',
    component: ReservationWizardContainerComponent,
    resolve: { resolvedReservation: ReservationResolverService },
    children: [
      {
        path: 'additional-services',
        component: AdditionalServicesContainerComponent,
      },
      {
        path: 'personal-data',
        component: PersonalDataContainerComponent,
      },
      {
        path: 'payment-method',
        component: PaymentMethodContainerComponent,
      },
      {
        path: 'confirmation',
        component: ConfirmationContainerComponent,
      },
      {
        path: '',
        redirectTo: 'additional-services',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationWizardRoutingModule {}
