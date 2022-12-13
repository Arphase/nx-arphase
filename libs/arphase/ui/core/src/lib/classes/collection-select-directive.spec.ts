import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { of } from 'rxjs';

import { ApsCollectionService } from '../services/collection.service';
import { ApsCollectionSelectDirective } from './collection-select.directive';

describe('ApsCollectionSelectDirective', () => {
  @Component({ selector: 'aps-test' })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<ApsCollectionSelectDirective<unknown>>;

  const createDirective = createDirectiveFactory({
    directive: ApsCollectionSelectDirective,
    host: HostComponent,
    imports: [NzSelectModule, ReactiveFormsModule],
    providers: [{ provide: ApsCollectionService, useValue: { options$: of([]), clearCache: jest.fn() } }],
  });

  beforeEach(
    () =>
      (spectator = createDirective(
        `<form [formGroup]="form"><nz-select formControlName="test" apsCollectionSelect></nz-select></form>`
      ))
  );

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
