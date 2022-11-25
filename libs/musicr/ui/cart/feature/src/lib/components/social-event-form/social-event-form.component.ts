import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Address } from '@arphase/common';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { OrderTypes, SocialEvent, socialEventLabels, SocialEventPlaces } from '@musicr/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export function createSocialEventForm(orderType: OrderTypes): UntypedFormGroup {
  const controls = {
    eventType: new UntypedFormControl(null, ApsValidators.required),
    date: new UntypedFormControl(null, ApsValidators.required),
    startTime: new UntypedFormControl(null, ApsValidators.required),
    endTime: new UntypedFormControl(null, ApsValidators.required),
    eventPlace: new UntypedFormControl(null, ApsValidators.required),
    notes: new UntypedFormControl(null),
    requiresAssembly: new UntypedFormControl(false),
    address: createAddressForm(),
  };
  return orderType === OrderTypes.purchase
    ? new UntypedFormGroup(controls)
    : new UntypedFormGroup({
        date: controls.date,
        startTime: controls.startTime,
        endTime: controls.endTime,
        address: new UntypedFormGroup({
          zipcode: new UntypedFormControl('', [
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
})
export class SocialEventFormComponent extends ApsFormComponent<SocialEvent> implements OnChanges {
  @Input() orderType: OrderTypes;
  orderTypeEnum = OrderTypes;
  eventPlaceOptions: NzSelectOptionInterface[] = [
    {
      label: socialEventLabels[SocialEventPlaces.garage],
      value: SocialEventPlaces.garage,
    },
    {
      label: socialEventLabels[SocialEventPlaces.inside],
      value: SocialEventPlaces.inside,
    },
    {
      label: socialEventLabels[SocialEventPlaces.garden],
      value: SocialEventPlaces.garden,
    },
    {
      label: socialEventLabels[SocialEventPlaces.office],
      value: SocialEventPlaces.office,
    },
    {
      label: socialEventLabels[SocialEventPlaces.backyard],
      value: SocialEventPlaces.backyard,
    },
    {
      label: socialEventLabels[SocialEventPlaces.eventHall],
      value: SocialEventPlaces.eventHall,
    },
    {
      label: socialEventLabels[SocialEventPlaces.terrace],
      value: SocialEventPlaces.terrace,
    },
  ];
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

  get addressForm(): UntypedFormGroup {
    return this.form.get('address') as UntypedFormGroup;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.orderType || changes.item) {
      this.form = createSocialEventForm(this.orderType);
      if (this.item) {
        this.form.patchValue(this.item);
      }
    }
  }
}
