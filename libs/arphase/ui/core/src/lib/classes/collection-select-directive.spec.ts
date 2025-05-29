import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApsCollectionService } from '@arphase/ui/data';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { of } from 'rxjs';
import { v4 } from 'uuid';
import { ApsCollectionSelectDirective } from './collection-select.directive';

describe('ApsCollectionSelectDirective', () => {
  @Component({ selector: 'aps-test', host: { hostId: v4() }, standalone: false })
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
        `<form [formGroup]="form"><nz-select formControlName="test" apsCollectionSelect></nz-select></form>`,
      )),
  );

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
