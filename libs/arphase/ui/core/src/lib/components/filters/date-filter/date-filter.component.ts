import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { formatDate } from '@arphase/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { endOfDay, startOfDay } from 'date-fns';
import dayjs from 'dayjs';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export interface Dates {
  startDate: string;
  endDate: string;
  dateType: string;
}

@UntilDestroy()
@Component({
  selector: 'aps-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ApsDateFilterComponent implements OnChanges {
  @Input() dateTypeOptions: NzSelectOptionInterface[] = [];
  @Input() currentDates: Dates;
  @Input() label: string;
  startDate = '';
  startDateLabel = '';
  endDate = '';
  endDateLabel = '';
  dateType = '';
  showError = false;
  control: UntypedFormGroup;
  mappedTitle: string;
  @Output() filterItems = new EventEmitter<Dates>();

  constructor(private fb: UntypedFormBuilder) {
    this.control = this.fb.group(
      { dateType: null, startDate: null, endDate: null },
      {
        validators: (control: AbstractControl) => {
          const { startDate, endDate, dateType } = control.value;
          const selectedBothDates = !!startDate && !!endDate;
          const mustSelectDateType = this.dateTypeOptions.length > 0;
          const selectedDateType = mustSelectDateType ? !!dateType : true;
          return selectedBothDates && selectedDateType ? null : { error: true };
        },
      }
    );

    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(({ startDate, endDate, dateType }) => {
      this.startDate = startDate ? dayjs(startOfDay(startDate)).format() : '';
      this.startDateLabel = formatDate(startDate);
      this.endDate = endDate ? dayjs(endOfDay(endDate)).format() : '';
      this.endDateLabel = formatDate(endDate);
      this.dateType = dateType;
      this.setFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.label) {
      this.mappedTitle = this.label;
    }

    if (
      changes.currentDates &&
      changes.currentDates.firstChange &&
      this.currentDates?.startDate &&
      this.currentDates?.endDate
    ) {
      const { startDate, endDate, dateType } = this.currentDates;
      this.control.get('startDate').patchValue(startDate, { emitEvent: false });
      this.control.get('endDate').patchValue(dayjs(endDate).toDate(), { emitEvent: false });
      this.control.get('dateType').patchValue(dateType, { emitEvent: false });
      this.startDate = startDate;
      this.startDateLabel = formatDate(dayjs(startDate).toDate());
      this.endDate = endDate;
      this.endDateLabel = formatDate(dayjs(endDate).toDate());
      this.dateType = dateType;
      this.mappedTitle = `${this.startDateLabel} - ${this.endDateLabel}`;
    }
  }

  get showActiveStatus(): boolean {
    return this.control.valid;
  }

  setFilter(): void {
    const startDateValue = this.control.get('startDate').value;
    const endDateValue = this.control.get('endDate').value;

    this.showError = dayjs(startDateValue).isAfter(endDateValue);

    if (this.showError) {
      return;
    }

    if (this.control.valid) {
      this.mappedTitle = `${this.startDateLabel} - ${this.endDateLabel}`;

      this.filterItems.emit({
        startDate: this.startDate,
        endDate: this.endDate,
        dateType: this.dateType,
      });
    } else {
      this.mappedTitle = this.label;
    }
  }

  deleteFilters(): void {
    this.control.reset();
    this.startDate = '';
    this.endDate = '';
    this.dateType = '';
    this.setFilter();
    this.mappedTitle = this.label;
    this.filterItems.emit({ startDate: '', endDate: '', dateType: '' });
  }
}
