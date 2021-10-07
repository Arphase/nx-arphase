import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createAddressForm } from '@arphase/ui/addresses';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { SocialEvent, SocialEventPlaces } from '@musicr/domain';
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
      label: 'Cochera',
      value: SocialEventPlaces[SocialEventPlaces.garage],
    },
    {
      label: 'Interior',
      value: SocialEventPlaces[SocialEventPlaces.inside],
    },
    {
      label: 'Jardín',
      value: SocialEventPlaces[SocialEventPlaces.garden],
    },
    {
      label: 'Oficina',
      value: SocialEventPlaces[SocialEventPlaces.office],
    },
    {
      label: 'Patio',
      value: SocialEventPlaces[SocialEventPlaces.backyard],
    },
    {
      label: 'Salón',
      value: SocialEventPlaces[SocialEventPlaces.eventHall],
    },
    {
      label: 'Terraza',
      value: SocialEventPlaces[SocialEventPlaces.terrace],
    },
  ];

  form = new FormGroup({
    name: new FormControl(null, ApsValidators.required),
    eventType: new FormControl(null, ApsValidators.required),
    date: new FormControl(null, ApsValidators.required),
    startTime: new FormControl(null, ApsValidators.required),
    endTime: new FormControl(null, ApsValidators.required),
    eventPlace: new FormControl(null, ApsValidators.required),
    notes: new FormControl(null),
    requiresAssembly: new FormControl(null, ApsValidators.required),
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
