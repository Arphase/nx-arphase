import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { CrudEvents } from '../../models';
import { IvtSubscriberComponent } from '../subscriber/subscriber.component';

@Component({
  selector: 'ivt-row',
  template: '',
})
export class IvtRowComponent<T> extends IvtSubscriberComponent implements CrudEvents<T> {
  @Input() item: T;
  @Input() className: string;
  @Input() isSelected = false;
  showStatusSubject = new Subject();
  showStatus$ = this.showStatusSubject.asObservable();
  visibleStatus$ = this.showStatus$.pipe(
    switchMap(() =>
      timer(0, 1000).pipe(
        take(2),
        map(x => x % 2 === 0)
      )
    )
  );
  @Output() create = new EventEmitter<void>();
  @Output() showDetail = new EventEmitter<T>();
  @Output() edit = new EventEmitter<Partial<T>>();
  @Output() delete = new EventEmitter<T>();
  @Output() toggle = new EventEmitter<T>();
  @Output() selectItem = new EventEmitter<T>();
}
