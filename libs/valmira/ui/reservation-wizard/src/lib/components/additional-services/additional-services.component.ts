import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApsFormComponent } from '@arphase/ui/core';
import { Reservation } from '@valmira/domain';

@Component({
  selector: 'vma-additional-services',
  templateUrl: './additional-services.component.html',
  styleUrls: ['./additional-services.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalServicesComponent extends ApsFormComponent<Reservation> {
  form = new FormGroup({});
}
