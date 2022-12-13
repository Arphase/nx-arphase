import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let spectator: Spectator<FooterComponent>;
  const createComponent = createComponentFactory({
    component: FooterComponent,
    imports: [HttpClientTestingModule],
    mocks: [NzMessageService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
