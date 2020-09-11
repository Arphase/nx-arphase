import { AfterViewInit, Directive, Host, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[ivtUppercase]',
})
export class IvtUppercaseDirective implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(@Host() private ngControl: NgControl) {}

  ngAfterViewInit() {
    if (this.ngControl && this.ngControl.valueChanges) {
      this.ngControl.valueChanges
        .pipe(
          filter((value) => typeof value === 'string'),
          takeUntil(this.destroy$)
        )
        .subscribe((value) =>
          this.ngControl.control.patchValue(value.toUpperCase(), {
            emitEvent: false,
          })
        );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
