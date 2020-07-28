import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

export interface CrudEvents<T> {
  create: EventEmitter<void>;
  showDetail: EventEmitter<T>;
  edit: EventEmitter<T>;
  delete: EventEmitter<T>;
  toggle: EventEmitter<T>;
}

@Component({
  template: '',
  selector: 'ivt-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtListComponent<T = any> implements CrudEvents<T>, OnDestroy {
  @Input() list: T[] = [];
  @Input() hasMoreItems: boolean;
  @Input() loading: boolean;
  @Output() create = new EventEmitter<void>();
  @Output() showDetail = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() toggle = new EventEmitter<T>();
  @Output() filterItems = new EventEmitter<any>();
  @Output() getMoreItems = new EventEmitter<void>();
  showFilters: boolean;
  protected destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFilter(): void {
    this.showFilters = !this.showFilters;
  }

  updateSearchBarFilter(text: string): void {
    this.filterItems.emit({ text });
  }

  updateSort(sort: any): void {
    this.filterItems.emit({ sort });
  }

  updateDateFilter(dates: any): void {
    this.filterItems.emit({ dates });
  }
}
