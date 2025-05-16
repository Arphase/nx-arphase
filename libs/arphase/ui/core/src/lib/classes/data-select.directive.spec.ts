import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApsDataService } from '@arphase/ui/data';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { of } from 'rxjs';

import { ApsDataSelectDirective } from './data-select.directive';

describe('ApsDataSelectDirective', () => {
  @Component({ selector: 'aps-test', standalone: false })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<ApsDataSelectDirective<unknown>>;

  const createDirective = createDirectiveFactory({
    directive: ApsDataSelectDirective,
    host: HostComponent,
    imports: [NzSelectModule, ReactiveFormsModule],
    providers: [{ provide: ApsDataService, useValue: { getWithQuery: () => of() } }],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form"><nz-select formControlName="test" apsDataSelect></nz-select></form>`,
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
