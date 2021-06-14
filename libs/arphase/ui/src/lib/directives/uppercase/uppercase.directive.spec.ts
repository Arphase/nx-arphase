import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { IvtUppercaseDirective } from './uppercase.directive';

describe('IvtUppercaseDirective', () => {
  @Component({
    selector: 'test',
  })
  class TestHostcomponent {
    form = new FormGroup({ test: new FormControl() });
  }

  let spectator: SpectatorDirective<IvtUppercaseDirective>;
  const createDirective = createDirectiveFactory({
    directive: IvtUppercaseDirective,
    host: TestHostcomponent,
    imports: [ReactiveFormsModule],
  });

  beforeEach(() => {
    spectator = createDirective('<form [formGroup]="form"> <input formControlName="test" ivtUppercase /></form>');
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
