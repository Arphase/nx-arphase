import { AfterViewInit, Directive, Host } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';

@UntilDestroy()
@Directive({
  selector: '[ivtUppercase]',
})
export class IvtUppercaseDirective implements AfterViewInit {
  constructor(@Host() private ngControl: NgControl) {}

  ngAfterViewInit() {
    if (this.ngControl && this.ngControl.valueChanges) {
      this.ngControl.valueChanges
        .pipe(
          filter(value => typeof value === 'string'),
          untilDestroyed(this)
        )
        .subscribe(value =>
          this.ngControl.control.patchValue(value.toUpperCase(), {
            emitEvent: false,
          })
        );
    }
  }
}
