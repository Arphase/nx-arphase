import { MUSIC_REVOLUTION_CONFIGURATION } from '@musicr/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxMaskDirective } from 'ngx-mask';
import { PriceOptionFormComponent } from './price-option-form.component';

describe('PriceOptionFormComponent', () => {
  let spectator: Spectator<PriceOptionFormComponent>;
  const createComponent = createComponentFactory({
    component: PriceOptionFormComponent,
    overrideComponents: [[PriceOptionFormComponent, { remove: { imports: [NgxMaskDirective, NzUploadModule] } }]],
    providers: [{ provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: {} }],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
