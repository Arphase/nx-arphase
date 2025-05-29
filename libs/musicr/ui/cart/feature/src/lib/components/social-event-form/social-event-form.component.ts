import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from '@arphase/common';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsFormComponent, ApsValidators, ControlsOf } from '@arphase/ui/forms';
import { eventPlaceOptions, OrderTypes, SocialEvent } from '@musicr/domain';

export function createSocialEventForm(orderType: OrderTypes): FormGroup {
  const controls = {
    eventType: new FormControl(null, ApsValidators.required),
    date: new FormControl(null, ApsValidators.required),
    startTime: new FormControl(null, ApsValidators.required),
    endTime: new FormControl(null, ApsValidators.required),
    eventPlace: new FormControl(null, ApsValidators.required),
    notes: new FormControl(null),
    requiresAssembly: new FormControl(false),
    address: createAddressForm(),
  };
  return orderType === OrderTypes.purchase
    ? new FormGroup(controls)
    : new FormGroup({
        date: controls.date,
        startTime: controls.startTime,
        endTime: controls.endTime,
        address: new FormGroup({
          zipcode: new FormControl('', [
            ApsValidators.required,
            ApsValidators.minLength(5),
            ApsValidators.maxLength(5),
          ]),
        }),
      });
}

@Component({
  selector: 'mrl-social-event-form',
  templateUrl: './social-event-form.component.html',
  styleUrls: ['./social-event-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SocialEventFormComponent extends ApsFormComponent<SocialEvent> implements OnChanges {
  @Input() orderType: OrderTypes;
  orderTypeEnum = OrderTypes;
  eventPlaceOptions = eventPlaceOptions;
  placeholders: Address = {
    zipcode: '66230',
    country: 'México',
    state: 'Nuevo León',
    city: 'San Pedro',
    suburb: 'Casco Urbano',
    street: 'Porfirio Díaz',
    externalNumber: '1000',
    internalNumber: 'A',
  };
  form = createSocialEventForm(OrderTypes.purchase) as FormGroup<ControlsOf<SocialEvent>>;

  get addressForm(): FormGroup<ControlsOf<Address>> {
    return this.form.get('address') as FormGroup<ControlsOf<Address>>;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.orderType || changes.item) {
      this.form = createSocialEventForm(this.orderType) as FormGroup<ControlsOf<SocialEvent>>;
      if (this.item) {
        this.form.patchValue(this.item);
      }
    }
  }
}
