import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { ApsUppercaseDirective } from './uppercase.directive';

describe('ApsUppercaseDirective', () => {
  @Component({
    selector: 'test',
  })
  class TestHostcomponent {
    form = new FormGroup({ test: new FormControl() });
  }

  let spectator: SpectatorDirective<ApsUppercaseDirective>;
  const createDirective = createDirectiveFactory({
    directive: ApsUppercaseDirective,
    host: TestHostcomponent,
    imports: [ReactiveFormsModule],
  });

  beforeEach(() => {
    spectator = createDirective('<form [formGroup]="form"> <input formControlName="test" apsUppercase /></form>');
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
