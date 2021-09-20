import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { PlaceCategories } from '@valmira/domain';
import dayjs from 'dayjs';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

interface FiltersForm {
  startDate: string;
  endDate: string;
  capacity: number;
}

interface FiltersPayload extends FiltersForm {
  resetList: string;
  onlyActives: string;
}

@Component({
  selector: 'vma-place-search-form',
  templateUrl: './place-search-form.component.html',
  styleUrls: ['./place-search-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceSearchFormComponent extends ApsFormComponent<FiltersForm, FiltersPayload> {
  categoryOptions: NzSelectOptionInterface[] = [
    {
      label: 'Premium',
      value: PlaceCategories.premium,
    },
    {
      label: 'Pareja',
      value: PlaceCategories.couple,
    },
    {
      label: 'Niños',
      value: PlaceCategories.kids,
    },
  ];
  form = new FormGroup(
    {
      startDate: new FormControl(null, ApsValidators.required),
      endDate: new FormControl(null, ApsValidators.required),
      capacity: new FormControl(null, ApsValidators.required),
    },
    { validators: ApsValidators.dateLessThan('startDate', 'endDate') }
  );

  get showDatesError(): boolean {
    return !!this.form?.errors && this.form?.get('startDate')?.touched && this.form?.get('endDate')?.touched;
  }

  transformFromForm(values: FiltersForm): FiltersPayload {
    return {
      ...values,
      startDate: dayjs(values.startDate).utc().format(),
      endDate: dayjs(values.startDate).utc().format(),
      resetList: String(true),
      onlyActives: String(true),
    };
  }
}
