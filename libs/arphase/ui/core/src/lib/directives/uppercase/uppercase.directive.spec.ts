import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { ApsUppercaseDirective } from './uppercase.directive';

describe('ApsUppercaseDirective', () => {
  @Component({
    selector: 'aps-test',
    standalone: false,
  })
  class TestHostComponent {
    form = new FormGroup({ test: new FormControl() });
  }

  let spectator: SpectatorDirective<ApsUppercaseDirective>;
  const createDirective = createDirectiveFactory({
    directive: ApsUppercaseDirective,
    host: TestHostComponent,
    imports: [ReactiveFormsModule],
  });

  beforeEach(() => {
    spectator = createDirective('<form [formGroup]="form"> <input formControlName="test" apsUppercase /></form>');
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
