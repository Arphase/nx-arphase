import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
} from '@angular/core';
import { LabelOptions, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import {
  MAT_FORM_FIELD,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormField,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { IvtInputDirective } from '../../directives/input/input.directive';

enum ValidatorTypes {
  required = 'required',
  max = 'max',
  min = 'min',
  email = 'email',
  rfc = 'rfc'
}

@Component({
  selector: 'ivt-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MAT_FORM_FIELD, useExisting: IvtFormFieldComponent }],
})
export class IvtFormFieldComponent extends MatFormField
  implements AfterContentInit, OnDestroy {
  @Input() label: string;
  @ContentChild(IvtInputDirective) input: IvtInputDirective;
  error: string;
  destroy$ = new Subject<void>();

  constructor(
    public _elementRef: ElementRef,
    _changeDetectorRef: ChangeDetectorRef,
    // tslint:disable-next-line: deprecation
    @Optional() @Inject(MAT_LABEL_GLOBAL_OPTIONS) labelOptions: LabelOptions,
    @Optional() _dir: Directionality,
    @Optional()
    @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS)
    _defaults: MatFormFieldDefaultOptions,
    _platform: Platform,
    _ngZone: NgZone,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) _animationMode: string
  ) {
    super(
      _elementRef,
      _changeDetectorRef,
      labelOptions,
      _dir,
      _defaults,
      _platform,
      _ngZone,
      _animationMode
    );
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    const reactiveControl = this.input.ngControl;
    reactiveControl.statusChanges
      .pipe(
        startWith(true),
        filter(() => !!reactiveControl.errors),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.setErrorMessage(reactiveControl.errors));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  _getDisplayedMessages(): 'error' | 'hint' {
    return this._errorChildren && this._control.errorState ? 'error' : 'hint';
  }

  setErrorMessage(errors: Record<string, any>): void {
    const firstError = Object.keys(errors)[0];
    const errorValue = errors[firstError];
    const label = this.label.toLowerCase();
    const errorMessages = {
      [ValidatorTypes.required]: `El campo ${label} es requerido`,
      [ValidatorTypes.max]: `El campo ${label} no debe ser mayor a ${errorValue.max}`,
      [ValidatorTypes.min]: `El campo ${label} debe ser mayor o igual a ${errorValue.min}`,
      [ValidatorTypes.email]: `El campo ${label} no tiene formato de correo`,
      [ValidatorTypes.rfc]: `El campo ${label} no tiene formato de RFC`
    };

    this.error = errorMessages[firstError];
  }
}
