import { Component } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ApsMultiSelectFormArrayDirective } from './multi-select-form-array.directive';

describe('ApsMultiSelectFormArrayDirective', () => {
  @Component({
    selector: 'aps-test',
    standalone: false,
  })
  class HostComponent {
    form = new FormGroup({ test: new FormArray([]) });
  }

  let spectator: SpectatorDirective<ApsMultiSelectFormArrayDirective>;
  const createDirective = createDirectiveFactory({
    directive: ApsMultiSelectFormArrayDirective,
    host: HostComponent,
    imports: [ReactiveFormsModule, NzSelectModule],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form">
          <nz-select apsMultiSelectFormArray formArrayName="test" [nzOptions]=[]/>
      </form>`,
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
