import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/core';
import { PlaceCategories } from '@valmira/domain';
import dayjs from 'dayjs';

interface FiltersForm {
  startDate: string;
  endDate: string;
  capacity: number;
}

interface FiltersPayload extends FiltersForm {
  category: string;
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
  @Input() summary: Record<PlaceCategories, { category: PlaceCategories; amount: number }>;
  categoryOptions = [
    {
      value: 0,
      logo: 'assets/img/logo-all.svg',
      label: 'VER TODO',
    },
    {
      value: PlaceCategories[PlaceCategories.premium],
      logo: 'assets/img/logo-premium.svg',
      label: 'PREMIUM',
    },
    {
      value: PlaceCategories[PlaceCategories.couple],
      logo: 'assets/img/logo-couple.svg',
      label: 'PAREJAS',
    },
    {
      value: PlaceCategories[PlaceCategories.kids],
      logo: 'assets/img/logo-kids.svg',
      label: 'NIÑOS',
    },
  ];
  radioValue = this.categoryOptions[0].value;

  form = new FormGroup(
    {
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      capacity: new FormControl(null),
    },
    { validators: ApsValidators.dateLessThan('startDate', 'endDate') }
  );

  get showDatesError(): boolean {
    return !!this.form?.errors && this.form?.get('startDate')?.touched && this.form?.get('endDate')?.touched;
  }

  transformFromForm(values: FiltersForm): FiltersPayload {
    const { startDate, endDate } = values;
    return {
      ...values,
      category: String(this.radioValue),
      startDate: startDate ? dayjs(startDate).utc().format() : null,
      endDate: endDate ? dayjs(startDate).utc().format() : null,
      resetList: String(true),
      onlyActives: String(true),
    };
  }
}
