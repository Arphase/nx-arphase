import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Select } from '@ivt/c-data';
import { formatDate } from '@ivt/c-utils';
import moment from 'moment';
import { tap } from 'rxjs/operators';

import { IvtFilterComponent } from '../filter';

interface DateFilter {
  startDate: string;
  endDate: string;
  dateType: string;
}

@Component({
  selector: 'ivt-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IvtDateFilterComponent extends IvtFilterComponent<DateFilter> implements OnInit, OnChanges {
  @Input() dateTypeOptions: Select[] = [];
  @Input() value;
  @Output() filterItems = new EventEmitter<DateFilter>();
  startDate = '';
  endDate = '';
  dateType = '';
  showError = false;

  constructor(private fb: FormBuilder) {
    super();

    this.control = this.fb.group(
      {
        dateType: '',
        startDate: '',
        endDate: '',
      },
      {
        validators: (control: AbstractControl) => {
          const { startDate, endDate, dateType } = control.value;

          const selectedBothDates = !!startDate && !!endDate;
          const mustSelectDateType = this.dateTypeOptions.length > 0;
          const selectedDateType = mustSelectDateType ? !!dateType : true;

          return selectedBothDates && selectedDateType ? null : true;
        },
      }
    );
  }

  ngOnInit() {
    this.control.valueChanges
      .pipe(
        tap(({ startDate, endDate, dateType }) => {
          this.startDate = formatDate(startDate);
          this.endDate = formatDate(endDate);
          this.dateType = dateType;
          this.setFilter();
        })
      )
      .subscribe();

    if (this.value) {
      this.control.get('startDate').patchValue(moment(this.value.startDate, 'DD/MM/YYYY').toDate(), {
        emitEvent: false,
      });
      this.control.get('endDate').patchValue(moment(this.value.endDate, 'DD/MM/YYYY').toDate(), {
        emitEvent: false,
      });
      this.control.get('dateType').patchValue(this.value.dateType, { emitEvent: false });
      this.startDate = this.value.startDate;
      this.endDate = this.value.endDate;
      this.dateType = this.value.dateType;
      this.mappedTitle = `${this.startDate} - ${this.endDate}`;
    }
  }

  ngOnChanges() {
    this.setFilter();
  }

  get showActiveStatus(): boolean {
    return this.control.valid;
  }

  setFilter(): void {
    const startDateValue = this.control.get('startDate').value;
    const endDateValue = this.control.get('endDate').value;

    this.showError = moment(startDateValue).isAfter(endDateValue);

    if (this.showError) {
      return;
    }

    if (this.control.valid) {
      this.mappedTitle = `${this.startDate} - ${this.endDate}`;

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
    this.filterItems.emit({
      startDate: '',
      endDate: '',
      dateType: '',
    });
  }
}
