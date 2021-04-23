import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { ApsAutoSelectDirective } from './auto-select.directive';

describe('ApsAutoSelectDirective', () => {
  @Component({
    selector: 'test',
  })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<ApsAutoSelectDirective>;
  const createDirective = createDirectiveFactory({
    directive: ApsAutoSelectDirective,
    host: HostComponent,
    imports: [ReactiveFormsModule, NzSelectModule],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form"><nz-select formControlName="test" apsAutoSelect></nz-select></form>`
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
