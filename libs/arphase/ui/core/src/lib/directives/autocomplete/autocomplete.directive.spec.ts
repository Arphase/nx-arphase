import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFormModule } from 'ng-zorro-antd/form';

import { ApsAutocompleteDirective } from './autocomplete.directive';

describe('ApsAutocompleteDirective', () => {
  @Component({
    selector: 'aps-test',
  })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<ApsAutocompleteDirective>;
  const createDirective = createDirectiveFactory({
    directive: ApsAutocompleteDirective,
    host: HostComponent,
    imports: [ReactiveFormsModule, NzAutocompleteModule, NzFormModule],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form">
        <nz-form-control apsAutoError
                       apsAutocomplete
                       [options]="[]">
          <input nz-input
                 formControlName="test"
                 [nzAutocomplete]="auto" />
          <nz-autocomplete #auto></nz-autocomplete>
        </nz-form-control>
      </form>`
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
