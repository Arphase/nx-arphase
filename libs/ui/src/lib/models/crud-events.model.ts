import { EventEmitter } from '@angular/core';

export interface CrudEvents<T> {
  create: EventEmitter<void>;
  showDetail: EventEmitter<T>;
  edit: EventEmitter<T>;
  delete: EventEmitter<T>;
  toggle: EventEmitter<T>;
}
