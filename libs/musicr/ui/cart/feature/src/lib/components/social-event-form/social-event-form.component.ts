import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from '@arphase/common';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { SocialEvent, socialEventLabels, SocialEventPlaces } from '@musicr/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'mrl-social-event-form',
  templateUrl: './social-event-form.component.html',
  styleUrls: ['./social-event-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialEventFormComponent extends ApsFormComponent<SocialEvent> implements OnChanges {
  eventPlaceOptions: NzSelectOptionInterface[] = [
    {
      label: socialEventLabels[SocialEventPlaces.garage],
      value: SocialEventPlaces[SocialEventPlaces.garage],
    },
    {
      label: socialEventLabels[SocialEventPlaces.inside],
      value: SocialEventPlaces[SocialEventPlaces.inside],
    },
    {
      label: socialEventLabels[SocialEventPlaces.garden],
      value: SocialEventPlaces[SocialEventPlaces.garden],
    },
    {
      label: socialEventLabels[SocialEventPlaces.office],
      value: SocialEventPlaces[SocialEventPlaces.office],
    },
    {
      label: socialEventLabels[SocialEventPlaces.backyard],
      value: SocialEventPlaces[SocialEventPlaces.backyard],
    },
    {
      label: socialEventLabels[SocialEventPlaces.eventHall],
      value: SocialEventPlaces[SocialEventPlaces.eventHall],
    },
    {
      label: socialEventLabels[SocialEventPlaces.terrace],
      value: SocialEventPlaces[SocialEventPlaces.terrace],
    },
  ];
  placeHolders: Address = {
    zipcode: '66230',
    country: 'México',
    state: 'Nuevo León',
    city: 'San Pedro',
    suburb: 'Casco Urbano',
    street: 'Porfirio Díaz',
    externalNumber: '1000',
    internalNumber: 'A',
  };

  form = new FormGroup({
    name: new FormControl(null, ApsValidators.required),
    eventType: new FormControl(null, ApsValidators.required),
    date: new FormControl(null, ApsValidators.required),
    startTime: new FormControl(null, ApsValidators.required),
    endTime: new FormControl(null, ApsValidators.required),
    eventPlace: new FormControl(null, ApsValidators.required),
    notes: new FormControl(null),
    requiresAssembly: new FormControl(false),
    address: createAddressForm(),
  });

  get addressForm(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue(this.item);
    }
  }
}
