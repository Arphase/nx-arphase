import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { ApsAutoErrorDirective } from './auto-error.directive';

describe('ApsAutoErrorDirective', () => {
  @Component({
    selector: 'aps-test',
    standalone: false,
  })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<ApsAutoErrorDirective>;
  const createDirective = createDirectiveFactory({
    directive: ApsAutoErrorDirective,
    host: HostComponent,
    imports: [ReactiveFormsModule, NzSelectModule],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form"><nz-select formControlName="test" apsAutoError></nz-select></form>`,
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
