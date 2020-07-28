import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'ivt-form',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtFormComponent<T = any> implements OnDestroy {
  @Input() form: FormGroup;
  @Input() item: Partial<T>;
  @Output() submitForm = new EventEmitter<T>();
  protected destroy$ = new Subject<void>();

  get values(): T {
    return this.form?.getRawValue() as T;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(): void {
    if (this.form.valid || this.form.disabled) {
      this.submitForm.emit(this.values);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
