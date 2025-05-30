import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

dayjs.extend(utc);
interface FiltersForm {
  startDate: Date | string;
  endDate: Date | string;
  capacity: number;
}

interface FiltersPayload extends FiltersForm {
  resetList: string;
  onlyActives: string;
}

@UntilDestroy()
@Component({
  selector: 'vma-place-search-form',
  templateUrl: './place-search-form.component.html',
  styleUrls: ['./place-search-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PlaceSearchFormComponent extends ApsFormComponent<FiltersForm, FiltersPayload> implements OnInit {
  @ViewChild('endDateCalendar', { static: true }) endDateCalendar: NzDatePickerComponent;

  form = new UntypedFormGroup(
    {
      startDate: new UntypedFormControl(null),
      endDate: new UntypedFormControl(null),
      capacity: new UntypedFormControl(null),
    },
    { validators: ApsValidators.dateLessThan('startDate', 'endDate') },
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  disableStartDate = (startValue: Date): boolean => {
    const endDate = this.values.endDate as Date;
    if (startValue.getTime() < new Date().getTime()) {
      return true;
    }
    if (endDate) {
      return startValue.getTime() > endDate.getTime();
    }
    return false;
  };

  disableEndDate = (endValue: Date): boolean => {
    const startDate = this.values.startDate as Date;
    if (endValue.getTime() < new Date().getTime()) {
      return true;
    }
    if (startDate) {
      return endValue.getTime() <= startDate.getTime();
    }
    return false;
  };

  ngOnInit() {
    this.form
      .get('startDate')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => this.endDateCalendar.open());

    this.form
      .get('endDate')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            startDate: dayjs(this.values.startDate).format('DD-MM-YYYY'),
            endDate: dayjs(this.values.endDate).format('DD-MM-YYYY'),
          },
          queryParamsHandling: 'merge',
        });
      });
  }

  transformFromForm(values: FiltersForm): FiltersPayload {
    const { startDate, endDate } = values;
    return {
      ...values,
      startDate: startDate ? dayjs(startDate).utc().format() : null,
      endDate: endDate ? dayjs(endDate).utc().format() : null,
      resetList: String(true),
      onlyActives: String(true),
    };
  }
}
