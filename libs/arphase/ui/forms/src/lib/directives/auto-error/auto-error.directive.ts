import { AfterContentInit, ChangeDetectorRef, ContentChild, Directive, Optional, Self } from '@angular/core';
import { FormControlDirective, FormControlName, NgControl } from '@angular/forms';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { filter } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[apsAutoError]',
  standalone: false,
})
export class ApsAutoErrorDirective implements AfterContentInit {
  @ContentChild(NgControl, { static: true }) ngControl: FormControlName | FormControlDirective;
  constructor(
    private cdr: ChangeDetectorRef,
    @Optional() @Self() private nzFormControl: NzFormControlComponent,
  ) {}

  ngAfterContentInit(): void {
    if (this.nzFormControl && this.ngControl) {
      this.ngControl.statusChanges.pipe(filter(status => status === 'INVALID', untilDestroyed(this))).subscribe(() => {
        const errors = this.ngControl.errors || {};
        Object.values(errors).some(value => (this.nzFormControl.nzErrorTip = value.errorTip));
        this.cdr.markForCheck();
      });
    }
  }
}
