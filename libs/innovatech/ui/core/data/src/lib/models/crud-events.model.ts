import { EventEmitter } from '@angular/core';

export interface CrudEvents<T> {
  create: EventEmitter<void>;
  showDetail: EventEmitter<T>;
  edit: EventEmitter<Partial<T>>;
  delete: EventEmitter<T>;
  toggle: EventEmitter<T>;
}
