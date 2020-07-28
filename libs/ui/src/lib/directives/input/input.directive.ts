import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  NgZone,
  Optional,
  Renderer2,
  Self,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { MAT_INPUT_VALUE_ACCESSOR, MatInput } from '@angular/material/input';

@Directive({
  selector: '[ivtInput]',
  providers: [{ provide: MatFormFieldControl, useExisting: IvtInputDirective }],
})
export class IvtInputDirective extends MatInput implements AfterViewInit {
  constructor(
    protected _elementRef: ElementRef<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    protected _platform: Platform,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional()
    @Self()
    @Inject(MAT_INPUT_VALUE_ACCESSOR)
    inputValueAccessor: any,
    _autofillMonitor: AutofillMonitor,
    ngZone: NgZone,
    private renderer: Renderer2,
    @Optional() @Inject(MAT_FORM_FIELD) _formField?: MatFormField
  ) {
    super(
      _elementRef,
      _platform,
      ngControl,
      _parentForm,
      _parentFormGroup,
      _defaultErrorStateMatcher,
      inputValueAccessor,
      _autofillMonitor,
      ngZone,
      _formField
    );
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // setTimeout(() => {
    //   const d2 = this.renderer.createElement('mat-error');
    //   const text = this.renderer.createText('Error');
    //   this.renderer.appendChild(d2, text);
    //   this.renderer.appendChild(
    //     this._elementRef.nativeElement.parentElement.parentElement
    //       .parentElement,
    //     d2
    //   );
    // }, 1000);
  }
}
