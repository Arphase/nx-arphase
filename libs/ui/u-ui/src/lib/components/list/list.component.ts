import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SortEvent } from '@ivt/c-data';

import { CrudEvents } from '../../models';
import { Dates } from '../filters/date-filter/date-filter.component';
import { IvtSubscriberComponent } from '../subscriber';

@Component({
  template: '',
  selector: 'ivt-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtListComponent<T> extends IvtSubscriberComponent implements CrudEvents<T> {
  @Input() list: T[] = [];
  @Input() hasMoreItems: boolean;
  @Input() loading: boolean;
  @Input() loadingExcel: boolean;
  @Output() create = new EventEmitter<void>();
  @Output() showDetail = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() toggle = new EventEmitter<T>();
  @Output() filterItems = new EventEmitter<unknown>();
  @Output() getMoreItems = new EventEmitter<void>();
  @Output() exportExcel = new EventEmitter<void>();
  showFilters: boolean;

  toggleFilter(): void {
    this.showFilters = !this.showFilters;
  }

  updateSearchBarFilter(text: string): void {
    this.filterItems.emit({ text });
  }

  updateSort(sort: SortEvent): void {
    this.filterItems.emit({ sort });
  }

  updateDateFilter(dates: Dates): void {
    this.filterItems.emit({ dates });
  }

  updateGroupsFilters(groupIds: number[]): void {
    this.filterItems.emit({ groupIds: groupIds.toString() });
  }

  updateCompaniesFilters(companyIds: number[]): void {
    this.filterItems.emit({ companyIds: companyIds.toString() });
  }

  updateUsersFilters(userIds: number[]): void {
    this.filterItems.emit({ userIds: userIds.toString() });
  }
}
